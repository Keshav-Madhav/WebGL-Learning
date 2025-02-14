import { resizeCanvas } from "./utils/resizeCanvas.js";

// Get canvas and WebGL context
const canvas = document.getElementById("glCanvas");
resizeCanvas({ canvasArray: [canvas] });

const gl = canvas.getContext("webgl");
if (!gl) {
  console.error("WebGL not supported!");
} else {
  console.log("WebGL initialized!");
}

// Vertex Shader Source Code
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment Shader Source Code
const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);
  }
`;

// Function to create and compile shaders
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

// Create vertex and fragment shaders
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

// Create WebGL Program
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error("Error linking program:", gl.getProgramInfoLog(program));
}

// Use the WebGL program
gl.useProgram(program);

// Define Triangle Vertices
const vertices = new Float32Array([
  0.0,  0.5,  // Top vertex
 -0.5, -0.5,  // Bottom-left vertex
  0.5, -0.5   // Bottom-right vertex
]);

// Create Buffer
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Get attribute location, enable it
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttributeLocation);

// Clear the screen and draw the triangle
gl.clearColor(0.2, 0.3, 0.3, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
