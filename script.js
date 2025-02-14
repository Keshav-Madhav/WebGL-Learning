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
attribute vec3 a_color;
varying vec3 v_color;

uniform vec2 u_translation; // Translation vector

void main() {
  gl_Position = vec4(a_position + u_translation, 0.0, 1.0);
  v_color = a_color;
}

`;

// Fragment Shader Source
const fragmentShaderSource = `
  precision mediump float;
  varying vec3 v_color;

  void main() {
    gl_FragColor = vec4(v_color, 1.0);
  }
`;

const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
if (!program) {
  console.error("Failed to create shader program.");
}
gl.useProgram(program);

// Define Triangle Vertices
const vertices = [
  //  X,     Y,      R,    G,    B
   0.0,   0.5,   1.0,  0.0,  0.0, // Red
  -0.5,  -0.5,   0.0,  1.0,  0.0, // Green
   0.5,  -0.5,   0.0,  0.0,  1.0  // Blue
];

const buffer = createBuffer(gl, vertices);
setAttribute(gl, program, "a_position", 2, buffer, 5, 0); // Position: 2 floats, stride 5, offset 0
setAttribute(gl, program, "a_color", 3, buffer, 5, 2); // Color: 3 floats, stride 5, offset 2

const uTranslationLocation = gl.getUniformLocation(program, "u_translation");
if (uTranslationLocation === null) {
  console.error("Uniform u_translation not found in shader.");
}

let translation = [0.0, 0.0];
const speed = 0.001;

function render() {
  const dt = getDeltaTime(165);
  vanillaContext.clearRect(0, 0, vanillaCanvas.width, vanillaCanvas.height);

  // Update position (move right)
  translation[0] += speed * dt;
  if (translation[0] > 1.0) translation[0] = -1.0;

  // Send updated translation to the shader
  gl.uniform2fv(uTranslationLocation, translation);

  clearCanvas(gl);
  draw(gl);

  drawFPS(vanillaCanvas.width, vanillaCanvas.height, vanillaContext);
  requestAnimationFrame(render);
}

render();