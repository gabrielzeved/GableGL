import { Quad } from "./mesh/Quad";
import { Canvas } from "./renderer/Canvas";
import { Shader } from "./shader/Shader";
import { ShaderProgram } from "./shader/ShaderProgram";
import { Texture } from "./texture/Texture";

const vertexShaderSrc = `
attribute vec3 coordinates;
attribute vec2 texCoords;

varying highp vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4(coordinates, 1.0);
    vTextureCoord = vec2(texCoords.x, 1.0 - texCoords.y);
}
`;

const fragmentShaderSrc = `
precision mediump float;

uniform sampler2D uSampler;

varying highp vec2 vTextureCoord;

void main()
{
  gl_FragColor = texture2D(uSampler, vTextureCoord);
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

const texture = new Texture(gl, gl.TEXTURE_2D);
texture.load('/public/wall.jpg');

const quad = new Quad(gl, shaderProgram);
quad.addTexture(texture);

quad.draw(shaderProgram);
function drawScene() {
  canvas.clearColor();
  shaderProgram.use();
  quad.draw(shaderProgram);
  requestAnimationFrame(drawScene);
}

drawScene();