import { initWebGL } from "./webgl-basics/initWebGL.js";
import { createProgram } from "./webgl-basics/shaderUtils.js";
import { createBuffer, setAttribute } from "./webgl-basics/bufferUtils.js";
import { clearCanvas, draw } from "./webgl-basics/drawUtils.js";
import { resizeCanvas } from "./utils/resizeCanvas.js";
import { getDeltaTime } from "./utils/deltaTime.js";
import { drawFPS } from "./utils/fpsDisplay.js";

const vanillaCanvas = document.getElementById("vanillaCanvas");
const vanillaContext = vanillaCanvas.getContext("2d");

const { gl, canvas } = initWebGL("glCanvas");
if (!gl) console.error("Failed to initialize WebGL.");

window.addEventListener("resize", () => {
  resizeCanvas({ canvasArray: [canvas, vanillaCanvas] });
  gl.viewport(0, 0, canvas.width, canvas.height);
});

resizeCanvas({ canvasArray: [canvas, vanillaCanvas] });
gl.viewport(0, 0, canvas.width, canvas.height);

// Vertex Shader Source
const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment Shader Source
const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);
  }
`;

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
if (!program) {
  console.error("Failed to create shader program.");
}
gl.useProgram(program);

// Define Triangle Vertices
const vertices = [
  0.0,  0.5,
 -0.5, -0.5,
  0.5, -0.5
];

// Create buffer and set attributes
const buffer = createBuffer(gl, vertices);
setAttribute(gl, program, "a_position", 2, buffer);

function render() {
  const dt = getDeltaTime(165);
  vanillaContext.clearRect(0, 0, vanillaCanvas.width, vanillaCanvas.height);

  clearCanvas(gl);
  draw(gl);

  drawFPS(vanillaCanvas.width, vanillaCanvas.height, vanillaContext);
  requestAnimationFrame(render);
}

render();
