import * as THREE from 'three';

function readCssColor(varName, fallback) {
  if (typeof window === 'undefined') return fallback;
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  return val || fallback;
}

function createProceduralFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#e9e7e0';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle architectural tile grid + warm gold aisle inlays
  ctx.strokeStyle = '#d3cfc4';
  ctx.lineWidth = 2;
  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(226, 189, 130, 0.45)';
  ctx.lineWidth = 4;
  ctx.strokeRect(8, 8, 496, 496);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 6);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createZoneSignTexture(title, price, freeCount) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#192334';
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = '#e2bd82';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 148);

  ctx.fillStyle = '#e2bd82';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText(title.toUpperCase(), 24, 56);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 22px sans-serif';
  ctx.fillText(`${price}  •  ${freeCount} Spots Free`, 24, 108);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Generates deterministic-feeling ~40% taken stalls per zone
 */
function generateZoneStalls(zoneId, cols, rows, isCornerZone, seedOffset = 0) {
  const stalls = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      idx += 1;
      const hash = Math.abs(Math.sin((idx + seedOffset) * 12.9898 + r * 78.233));
      const taken = hash < 0.4;
      const isCornerStall =
        isCornerZone ||
        ((r === 0 || r === rows - 1) && (c === 0 || c === cols - 1));

      stalls.push({
        id: `${zoneId}-R${r + 1}-S${idx}`,
        zoneId,
        row: `Row ${r + 1}`,
        stallNumber: `#${String(idx).padStart(2, '0')}`,
        stallType: isCornerStall ? 'Corner Stall (2-Side Open)' : 'Standard Stall',
        isCornerStall,
        colIndex: c,
        rowIndex: r,
        taken,
      });
    }
  }
  return stalls;
}

export function buildExpoHallScene(scene) {
  const palette = {
    navy: readCssColor('--es-navy', '#192334'),
    gold: readCssColor('--es-gold', '#e2bd82'),
    taken: readCssColor('--stall-taken', '#64748b'),
    free: readCssColor('--stall-free', '#dc2626'),
    selected: readCssColor('--stall-selected', '#2563eb'),
  };

  const hallGroup = new THREE.Group();
  scene.add(hallGroup);

  // Lighting
  const ambient = new THREE.AmbientLight('#fffdf8', 0.85);
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight('#ffffff', 1.25);
  dirLight.position.set(28, 42, 26);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.set(2048, 2048);
  scene.add(dirLight);

  const goldRimLight = new THREE.PointLight(palette.gold, 1.4, 75);
  goldRimLight.position.set(0, 14, -22);
  scene.add(goldRimLight);

  // Main Cutaway Floor (No roof so overhead view is unobstructed)
  const floorGeo = new THREE.BoxGeometry(84, 1.2, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    map: createProceduralFloorTexture(),
    roughness: 0.72,
    metalness: 0.08,
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.position.set(0, -0.6, 0);
  floorMesh.receiveShadow = true;
  hallGroup.add(floorMesh);

  // Low Cutaway Perimeter Walls (Navy + Gold Cap)
  const wallMat = new THREE.MeshStandardMaterial({
    color: palette.navy,
    roughness: 0.55,
    metalness: 0.2,
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: palette.gold,
    roughness: 0.35,
    metalness: 0.65,
  });

  const wallHeight = 2.6;
  const northWall = new THREE.Mesh(new THREE.BoxGeometry(84, wallHeight, 1.2), wallMat);
  northWall.position.set(0, wallHeight / 2, -32);
  const southWall = new THREE.Mesh(new THREE.BoxGeometry(84, wallHeight, 1.2), wallMat);
  southWall.position.set(0, wallHeight / 2, 32);
  const westWall = new THREE.Mesh(new THREE.BoxGeometry(1.2, wallHeight, 64), wallMat);
  westWall.position.set(-42, wallHeight / 2, 0);
  const eastWall = new THREE.Mesh(new THREE.BoxGeometry(1.2, wallHeight, 64), wallMat);
  eastWall.position.set(42, wallHeight / 2, 0);

  const northGold = new THREE.Mesh(new THREE.BoxGeometry(84, 0.22, 1.35), goldTrimMat);
  northGold.position.set(0, wallHeight + 0.1, -32);
  const southGold = new THREE.Mesh(new THREE.BoxGeometry(84, 0.22, 1.35), goldTrimMat);
  southGold.position.set(0, wallHeight + 0.1, 32);

  hallGroup.add(northWall, southWall, westWall, eastWall, northGold, southGold);

  // Zone Definitions (Corner 2-Side Open, Standard Blocks, Innovation/Keynote, VIP Lounge)
  const zoneConfigs = [
    {
      id: 'corner-north-west',
      name: 'Corner Block NW (2-Side Open)',
      type: 'corner',
      price: '$45 / Visit',
      center: [-23, 0, -13],
      size: [18, 12],
      cols: 3,
      rows: 2,
      seed: 11,
      baseColor: '#1f2e46',
    },
    {
      id: 'corner-south-east',
      name: 'Corner Block SE (2-Side Open)',
      type: 'corner',
      price: '$45 / Visit',
      center: [23, 0, 13],
      size: [18, 12],
      cols: 3,
      rows: 2,
      seed: 29,
      baseColor: '#1f2e46',
    },
    {
      id: 'standard-west',
      name: 'Enterprise Exhibitor Block W',
      type: 'standard',
      price: '$25 / Visit',
      center: [-23, 0, 11],
      size: [18, 14],
      cols: 3,
      rows: 2,
      seed: 47,
      baseColor: '#253552',
    },
    {
      id: 'standard-east',
      name: 'Commerce & Cloud Block E',
      type: 'standard',
      price: '$25 / Visit',
      center: [23, 0, -11],
      size: [18, 14],
      cols: 3,
      rows: 2,
      seed: 63,
      baseColor: '#253552',
    },
    {
      id: 'innovation-keynote',
      name: 'Innovation & Keynote Arena',
      type: 'keynote',
      price: '$35 / Visit',
      center: [0, 0, 8],
      size: [18, 14],
      cols: 3,
      rows: 2,
      seed: 81,
      baseColor: '#2c2947',
    },
    {
      id: 'vip-lounge-zone',
      name: 'VIP Lounge & Glass Viewing Deck',
      type: 'vip',
      price: '$120 / VIP',
      center: [0, 0, -14],
      size: [20, 11],
      cols: 3,
      rows: 2,
      seed: 97,
      baseColor: '#352b1d',
    },
  ];

  const zoneHitMeshes = [];
  const zoneMetaById = {};
  const allStalls = [];

  // Build Zone Platforms & Floating Signage
  zoneConfigs.forEach((cfg) => {
    const stalls = generateZoneStalls(cfg.id, cfg.cols, cfg.rows, cfg.type === 'corner', cfg.seed);
    const freeCount = stalls.filter((s) => !s.taken).length;

    const baseMat = new THREE.MeshStandardMaterial({
      color: cfg.baseColor,
      roughness: 0.6,
      metalness: 0.25,
    });
    const highlightMat = new THREE.MeshStandardMaterial({
      color: palette.gold,
      emissive: '#7a5f35',
      emissiveIntensity: 0.45,
      roughness: 0.35,
      metalness: 0.5,
    });

    const platform = new THREE.Mesh(
      new THREE.BoxGeometry(cfg.size[0], 0.35, cfg.size[1]),
      baseMat.clone()
    );
    platform.position.set(cfg.center[0], 0.175, cfg.center[2]);
    platform.receiveShadow = true;
    platform.userData = {
      zoneId: cfg.id,
      name: cfg.name,
      price: cfg.price,
      freeCount,
      totalCount: stalls.length,
      center: new THREE.Vector3(cfg.center[0], 0, cfg.center[2]),
      defaultMat: baseMat,
      highlightMat,
    };
    hallGroup.add(platform);
    zoneHitMeshes.push(platform);

    // Architectural Zone Header Banner
    const signTex = createZoneSignTexture(cfg.name, cfg.price, freeCount);
    const signMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(Math.min(cfg.size[0] * 0.92, 16), 3.6),
      new THREE.MeshBasicMaterial({ map: signTex, side: THREE.DoubleSide })
    );
    signMesh.position.set(cfg.center[0], 4.8, cfg.center[2] - cfg.size[1] / 2 + 0.3);
    hallGroup.add(signMesh);

    // Position every stall inside this zone with generous aisle spacing
    const cellW = (cfg.size[0] - 3) / cfg.cols;
    const cellD = (cfg.size[1] - 3) / cfg.rows;
    const startX = cfg.center[0] - ((cfg.cols - 1) * cellW) / 2;
    const startZ = cfg.center[2] - ((cfg.rows - 1) * cellD) / 2;

    stalls.forEach((st) => {
      const wx = startX + st.colIndex * cellW;
      const wz = startZ + st.rowIndex * cellD;
      const pos = new THREE.Vector3(wx, 0.35, wz);
      allStalls.push({ ...st, worldPos: pos });
    });

    zoneMetaById[cfg.id] = {
      ...cfg,
      freeCount,
      totalCount: stalls.length,
      centerVec: new THREE.Vector3(cfg.center[0], 0, cfg.center[2]),
    };
  });

  // Procedural 3D Booth Sub-Parts via InstancedMesh for Fast Smooth Rendering
  // Each stall has: Back Wall, Side Dividers (omitted on open corner sides for 2-side open sightlines), & Front Counter
  const count = allStalls.length;
  const backWallGeo = new THREE.BoxGeometry(2.8, 2.2, 0.18);
  const sideWallGeo = new THREE.BoxGeometry(0.18, 1.9, 2.5);
  const counterGeo = new THREE.BoxGeometry(2.6, 0.95, 0.55);
  const hitBoxGeo = new THREE.BoxGeometry(3.1, 2.4, 2.9);

  const partMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.45,
    metalness: 0.15,
  });

  const backWallInst = new THREE.InstancedMesh(backWallGeo, partMat, count);
  const leftDividerInst = new THREE.InstancedMesh(sideWallGeo, partMat, count);
  const rightDividerInst = new THREE.InstancedMesh(sideWallGeo, partMat, count);
  const counterInst = new THREE.InstancedMesh(counterGeo, partMat, count);

  const hitMat = new THREE.MeshBasicMaterial({ visible: false });
  const stallHitInst = new THREE.InstancedMesh(hitBoxGeo, hitMat, count);

  const dummy = new THREE.Object3D();
  const colorHelper = new THREE.Color();
  const stallWorldPosById = {};

  allStalls.forEach((st, i) => {
    stallWorldPosById[st.id] = st.worldPos.clone();

    const statusHex = st.taken ? palette.taken : palette.free;
    colorHelper.set(statusHex);

    // Back wall
    dummy.position.set(st.worldPos.x, st.worldPos.y + 1.1, st.worldPos.z - 1.15);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    backWallInst.setMatrixAt(i, dummy.matrix);
    backWallInst.setColorAt(i, colorHelper);

    // 2-Side Open Corner Stalls leave outer aisle sides open for broad sightlines & foot traffic
    const openLeft = st.isCornerStall && st.colIndex === 0;
    const openRight = st.isCornerStall && st.colIndex === 2;

    dummy.position.set(st.worldPos.x - 1.3, st.worldPos.y + 0.95, st.worldPos.z);
    dummy.scale.set(1, openLeft ? 0.001 : 1, 1);
    dummy.updateMatrix();
    leftDividerInst.setMatrixAt(i, dummy.matrix);
    leftDividerInst.setColorAt(i, colorHelper);

    dummy.position.set(st.worldPos.x + 1.3, st.worldPos.y + 0.95, st.worldPos.z);
    dummy.scale.set(1, openRight ? 0.001 : 1, 1);
    dummy.updateMatrix();
    rightDividerInst.setMatrixAt(i, dummy.matrix);
    rightDividerInst.setColorAt(i, colorHelper);

    // Front welcome counter (gold accent tint on counter)
    const counterColor = st.taken
      ? new THREE.Color(palette.taken).lerp(new THREE.Color('#ffffff'), 0.25)
      : new THREE.Color(palette.gold);
    dummy.position.set(st.worldPos.x, st.worldPos.y + 0.475, st.worldPos.z + 1.05);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    counterInst.setMatrixAt(i, dummy.matrix);
    counterInst.setColorAt(i, counterColor);

    // Invisible interactive hit volume
    dummy.position.set(st.worldPos.x, st.worldPos.y + 1.1, st.worldPos.z);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    stallHitInst.setMatrixAt(i, dummy.matrix);
  });

  [backWallInst, leftDividerInst, rightDividerInst, counterInst].forEach((inst) => {
    inst.castShadow = true;
    inst.receiveShadow = true;
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    hallGroup.add(inst);
  });
  stallHitInst.instanceMatrix.needsUpdate = true;
  hallGroup.add(stallHitInst);

  // 3D VIP Glass-Front Viewing Box overlooking the Expo Floor
  const vipBoxGroup = new THREE.Group();
  const vipBoxPos = new THREE.Vector3(0, 8.5, -24);
  vipBoxGroup.position.copy(vipBoxPos);

  const vipFloor = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.4, 8),
    new THREE.MeshStandardMaterial({ color: palette.navy, roughness: 0.4, metalness: 0.3 })
  );
  const vipBackWall = new THREE.Mesh(
    new THREE.BoxGeometry(11, 4.2, 0.3),
    new THREE.MeshStandardMaterial({ color: palette.navy, roughness: 0.5 })
  );
  vipBackWall.position.set(0, 2.2, -3.85);

  const vipGoldRail = new THREE.Mesh(
    new THREE.BoxGeometry(11, 0.25, 0.35),
    goldTrimMat
  );
  vipGoldRail.position.set(0, 0.35, 3.85);

  // Glass Front Panel overlooking the Expo Hall
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: '#dbeafe',
    transparent: true,
    opacity: 0.28,
    roughness: 0.08,
    metalness: 0.1,
    transmission: 0.4,
    reflectivity: 0.9,
  });
  const glassFront = new THREE.Mesh(new THREE.PlaneGeometry(10.6, 3.8), glassMat);
  glassFront.position.set(0, 2.1, 3.92);

  vipBoxGroup.add(vipFloor, vipBackWall, vipGoldRail, glassFront);
  scene.add(vipBoxGroup);

  // Dynamic selection highlight updater
  function applyStallColors(selectedStallId) {
    allStalls.forEach((st, i) => {
      let hex = st.taken ? palette.taken : palette.free;
      if (st.id === selectedStallId) hex = palette.selected;
      colorHelper.set(hex);

      backWallInst.setColorAt(i, colorHelper);
      if (!(st.isCornerStall && st.colIndex === 0)) leftDividerInst.setColorAt(i, colorHelper);
      if (!(st.isCornerStall && st.colIndex === 2)) rightDividerInst.setColorAt(i, colorHelper);
    });
    if (backWallInst.instanceColor) backWallInst.instanceColor.needsUpdate = true;
    if (leftDividerInst.instanceColor) leftDividerInst.instanceColor.needsUpdate = true;
    if (rightDividerInst.instanceColor) rightDividerInst.instanceColor.needsUpdate = true;
  }

  return {
    zoneHitMeshes,
    zoneMetaById,
    stallHitInst,
    allStalls,
    stallWorldPosById,
    vipBoxPos,
    applyStallColors,
  };
}