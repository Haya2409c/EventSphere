import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { buildExpoHallScene } from '../three/buildExpoHall';
import { createCameraFlight } from '../three/cameraFlight';

const OVERHEAD_CAM_POS = new THREE.Vector3(0, 56, 46);
const OVERHEAD_LOOK_AT = new THREE.Vector3(0, 0, 0);

const ExpoHall3DCanvas = ({
  selectedStall,
  onSelectStall,
  cameraMode, // 'overhead' | 'zone' | 'booth' | 'vip'
  activeZoneId,
  onZoneDive,
  onBackToHall,
  onBackToBooth,
}) => {
  const containerRef = useRef(null);
  const flightRef = useRef(null);
  const hallDataRef = useRef(null);
  const cameraModeRef = useRef(cameraMode);
  cameraModeRef.current = cameraMode;

  const [hoverTooltip, setHoverTooltip] = useState(null);

  // Trigger camera flights on mode/zone/booth changes
  useEffect(() => {
    const flight = flightRef.current;
    const hallData = hallDataRef.current;
    if (!flight || !hallData) return;

    if (cameraMode === 'overhead') {
      flight.flyTo(OVERHEAD_CAM_POS, OVERHEAD_LOOK_AT, 1600);
    } else if (cameraMode === 'zone' && activeZoneId) {
      const zMeta = hallData.zoneMetaById[activeZoneId];
      if (zMeta) {
        const diveCam = new THREE.Vector3(
          zMeta.centerVec.x,
          12.5,
          zMeta.centerVec.z + 13.5
        );
        flight.flyTo(diveCam, zMeta.centerVec, 2000);
      }
    } else if (cameraMode === 'booth' && selectedStall) {
      const bPos = hallData.stallWorldPosById[selectedStall.id];
      if (bPos) {
        const boothCam = new THREE.Vector3(bPos.x + 2.5, 6.2, bPos.z + 7.5);
        flight.flyTo(boothCam, bPos, 1500);
      }
    } else if (cameraMode === 'vip') {
      const boothTarget =
        (selectedStall && hallData.stallWorldPosById[selectedStall.id]) ||
        OVERHEAD_LOOK_AT;
      const vipCamPos = new THREE.Vector3(
        hallData.vipBoxPos.x,
        hallData.vipBoxPos.y + 2.4,
        hallData.vipBoxPos.z + 1.8
      );
      flight.flyTo(vipCamPos, boothTarget, 1800);
    }
  }, [cameraMode, activeZoneId, selectedStall]);

  // Sync selected stall color on InstancedMesh
  useEffect(() => {
    if (hallDataRef.current) {
      hallDataRef.current.applyStallColors(selectedStall?.id || null);
    }
  }, [selectedStall]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f7f7f5');

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 250);
    camera.position.copy(OVERHEAD_CAM_POS);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 - 0.08;
    controls.minDistance = 4;
    controls.maxDistance = 110;
    controls.target.copy(OVERHEAD_LOOK_AT);

    const flight = createCameraFlight(camera, controls);
    flightRef.current = flight;

    const hallData = buildExpoHallScene(scene);
    hallDataRef.current = hallData;
    hallData.applyStallColors(selectedStall?.id || null);

    // Raycaster for hover & click
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hoveredZoneMesh = null;

    const updatePointer = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const resetZoneHighlight = () => {
      if (hoveredZoneMesh && hoveredZoneMesh.userData.defaultMat) {
        hoveredZoneMesh.material = hoveredZoneMesh.userData.defaultMat;
        hoveredZoneMesh = null;
      }
    };

    const handlePointerMove = (e) => {
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // When zoomed into a zone/booth, inspect individual stalls first
      if (cameraModeRef.current !== 'overhead') {
        resetZoneHighlight();
        const stallHits = raycaster.intersectObject(hallData.stallHitInst, false);
        if (stallHits.length > 0 && typeof stallHits[0].instanceId === 'number') {
          const st = hallData.allStalls[stallHits[0].instanceId];
          if (st) {
            renderer.domElement.style.cursor = st.taken ? 'not-allowed' : 'pointer';
            setHoverTooltip({
              x,
              y,
              mode: 'stall',
              row: st.row,
              stallNumber: st.stallNumber,
              stallType: st.stallType,
              taken: st.taken,
            });
            return;
          }
        }
      }

      // Otherwise check Expo Hall zones/blocks
      const zoneHits = raycaster.intersectObjects(hallData.zoneHitMeshes, false);
      if (zoneHits.length > 0) {
        const hitMesh = zoneHits[0].object;
        if (hoveredZoneMesh !== hitMesh) {
          resetZoneHighlight();
          hoveredZoneMesh = hitMesh;
          hitMesh.material = hitMesh.userData.highlightMat;
        }
        renderer.domElement.style.cursor = 'pointer';
        setHoverTooltip({
          x,
          y,
          mode: 'zone',
          name: hitMesh.userData.name,
          price: hitMesh.userData.price,
          freeCount: hitMesh.userData.freeCount,
          totalCount: hitMesh.userData.totalCount,
        });
        return;
      }

      resetZoneHighlight();
      renderer.domElement.style.cursor = 'grab';
      setHoverTooltip(null);
    };

    const handleClick = (e) => {
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);

      if (cameraModeRef.current !== 'overhead') {
        const stallHits = raycaster.intersectObject(hallData.stallHitInst, false);
        if (stallHits.length > 0 && typeof stallHits[0].instanceId === 'number') {
          const st = hallData.allStalls[stallHits[0].instanceId];
          if (st && !st.taken) {
            const zMeta = hallData.zoneMetaById[st.zoneId];
            onSelectStall({
              ...st,
              zoneName: zMeta?.name || st.zoneId,
              price: zMeta?.price || '$25 / Visit',
            });
          }
          return;
        }
      }

      const zoneHits = raycaster.intersectObjects(hallData.zoneHitMeshes, false);
      if (zoneHits.length > 0) {
        const hitMesh = zoneHits[0].object;
        onZoneDive(hitMesh.userData.zoneId);
      }
    };

    const handlePointerLeave = () => {
      resetZoneHighlight();
      setHoverTooltip(null);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointermove', handlePointerMove);
    domEl.addEventListener('click', handleClick);
    domEl.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let rafId = 0;
    const animate = (now) => {
      rafId = requestAnimationFrame(animate);
      flight.update(now);
      controls.update();
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('pointermove', handlePointerMove);
      domEl.removeEventListener('click', handleClick);
      domEl.removeEventListener('pointerleave', handlePointerLeave);
      controls.dispose();
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, [onSelectStall, onZoneDive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[540px] rounded-2xl border border-[var(--es-border)] bg-[var(--es-ivory)] overflow-hidden select-none"
    >
      {/* Top-Left Camera Navigation Controls */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-2">
        {cameraMode !== 'overhead' && (
          <button
            type="button"
            onClick={onBackToHall}
            className="rounded-xl bg-[var(--es-navy)] px-3.5 py-2 text-xs font-semibold text-[var(--es-gold)] shadow-md transition hover:opacity-95"
          >
            ← Back to Expo Hall
          </button>
        )}

        {cameraMode === 'vip' && selectedStall && (
          <button
            type="button"
            onClick={onBackToBooth}
            className="rounded-xl border border-[var(--es-border)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--es-navy)] shadow-md transition hover:bg-[var(--es-ivory)]"
          >
            Back to My Expo Booth
          </button>
        )}
      </div>

      {/* Bottom-Left Stall Status Legend */}
      <div className="pointer-events-none absolute bottom-3.5 left-3.5 z-10 flex flex-wrap items-center gap-3 rounded-xl border border-[var(--es-border)] bg-white/95 backdrop-blur-xs px-3.5 py-2 text-[11px] font-semibold text-[var(--es-navy)] shadow-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-xs bg-[var(--stall-free)]" /> Free Stall
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-xs bg-[var(--stall-taken)]" /> Taken (~40%)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-xs bg-[var(--stall-selected)]" /> Selected (My Pick)
        </span>
      </div>

      {/* Floating Hover Tooltip */}
      {hoverTooltip && (
        <div
          style={{
            left: Math.min(hoverTooltip.x + 14, 420),
            top: Math.max(hoverTooltip.y - 12, 12),
          }}
          className="pointer-events-none absolute z-20 rounded-xl border border-[var(--es-gold)]/60 bg-[var(--es-navy)] px-3.5 py-2.5 text-xs text-white shadow-xl"
        >
          {hoverTooltip.mode === 'zone' ? (
            <div className="space-y-0.5">
              <p className="font-bold text-[var(--es-gold)]">{hoverTooltip.name}</p>
              <p className="text-slate-200">Visit Spot Rate: <strong>{hoverTooltip.price}</strong></p>
              <p className="text-slate-300">
                Available Booths Left: <strong>{hoverTooltip.freeCount}</strong> / {hoverTooltip.totalCount}
              </p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className="font-bold text-[var(--es-gold)]">
                {hoverTooltip.row} • Stall {hoverTooltip.stallNumber}
              </p>
              <p className="text-slate-200">{hoverTooltip.stallType}</p>
              <p className="text-[11px] text-slate-300">
                {hoverTooltip.taken ? 'Booked / Unavailable' : 'Click to book 1-on-1 visit spot'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpoHall3DCanvas;