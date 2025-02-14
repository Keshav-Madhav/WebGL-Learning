export function clearCanvas(gl) {
  gl.clearColor(0.2, 0.3, 0.3, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export function draw(gl) {
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
