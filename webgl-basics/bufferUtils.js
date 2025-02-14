export function createBuffer(gl, data) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  return buffer;
}

export function setAttribute(gl, program, name, size, buffer, stride = 0, offset = 0) {
  const location = gl.getAttribLocation(program, name);
  if (location === -1) {
    console.error(`Attribute ${name} not found in shader.`);
    return;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, size, gl.FLOAT, false, stride * 4, offset * 4);
}