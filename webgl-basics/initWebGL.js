export function initWebGL(canvasId) {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.error("WebGL not supported!");
    return null;
  }

  gl.viewport(0, 0, canvas.width, canvas.height); // Ensure WebGL uses the full canvas

  console.log("WebGL initialized!");
  return { gl, canvas };
}
