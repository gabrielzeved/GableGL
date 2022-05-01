import { Quad } from "./mesh/Quad";
import { Canvas } from "./renderer/Canvas";
import { Shader } from "./shader/Shader";
import { ShaderProgram } from "./shader/ShaderProgram";

const vertexShaderSrc = `
attribute vec3 coordinates;

void main(void)
{
    gl_Position = vec4(coordinates, 1.0);
}
`;

const fragmentShaderSrc = `
precision mediump float;

void main()
{
  gl_FragColor = vec4(1.0, 0.5, 0.2, 1.0);
} 
`;

const app = document.querySelector<HTMLDivElement>("#app")!;

const canvas = new Canvas(800, 600, app);
canvas.init();
canvas.clearColor();

const gl = canvas.context!;

const vertexShader = new Shader(gl, vertexShaderSrc, gl.VERTEX_SHADER);
const fragmentShader = new Shader(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);

const shaderProgram = new ShaderProgram(gl);
shaderProgram.addShader(vertexShader);
shaderProgram.addShader(fragmentShader);
shaderProgram.create();
shaderProgram.use();

const quad = new Quad(gl, shaderProgram);
quad.draw(shaderProgram);
