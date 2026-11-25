export function createCameraFlight(camera, controls) {
  let anim = null;

  function flyTo(targetPos, lookAtPos, durationMs = 2000) {
    const startPos = camera.position.clone();
    const endPos = targetPos.clone();
    const startTarget = controls.target.clone();
    const endTarget = lookAtPos.clone();
    const startTime = performance.now();

    anim = {
      startTime,
      durationMs,
      startPos,
      endPos,
      startTarget,
      endTarget,
    };
  }

  function update(now = performance.now()) {
    if (!anim) return;
    const rawT = Math.min(1, (now - anim.startTime) / anim.durationMs);
    // Smooth cubic ease-in-out
    const eased =
      rawT < 0.5 ? 4 * rawT * rawT * rawT : 1 - Math.pow(-2 * rawT + 2, 3) / 2;

    camera.position.lerpVectors(anim.startPos, anim.endPos, eased);
    controls.target.lerpVectors(anim.startTarget, anim.endTarget, eased);
    controls.update();

    if (rawT >= 1) {
      anim = null;
    }
  }

  function cancel() {
    anim = null;
  }

  return { flyTo, update, cancel };
}