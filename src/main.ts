import { Canvas } from "./renderer/Canvas";
import { Shader } from "./shader/Shader";
import { ShaderProgram } from "./shader/ShaderProgram";
import { AnimatedSprite } from "./sprites/AnimatedSprite";
import { Animation2D } from "./sprites/Animation2D";
import { SpriteBoundaries } from "./sprites/Sprite";
import { Timer } from "./utils/Timer";

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

const animation : SpriteBoundaries[] = [
  {
    position: [0,0],
    size: [24,24]
  },
  {
    position: [24,0],
    size: [24,24]
  },
  {
    position: [24 * 2,0],
    size: [24,24]
  },
  {
    position: [24 * 3,0],
    size: [24,24]
  },
]

const animation2D = new Animation2D("idle", animation, 0.4);
const sprite = new AnimatedSprite(animation[0], '/spritesheet.png', gl, shaderProgram);
sprite.addAnimation(animation2D);
sprite.setAnimation("idle")

const timer = new Timer();

sprite.draw(shaderProgram);
function drawScene(time: DOMHighResTimeStamp) {
  gl.enable(gl.BLEND);
  gl.blendFunc (gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  canvas.clearColor();
  shaderProgram.use();
  sprite.update(timer.delta);
  sprite.draw(shaderProgram);
  timer.update(time);
  requestAnimationFrame(drawScene);
}

drawScene(0);