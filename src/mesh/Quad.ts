import { ShaderProgram } from "../shader/ShaderProgram";
import { Mesh } from "./Mesh";

export class Quad extends Mesh {
  defaultBuffer = new Float32Array([
    -0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.5, 0.5, 0.0,
  ]);
  defaultIndices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  constructor(gl: WebGL2RenderingContext, shaderProgram: ShaderProgram) {
    super(gl);
    this.ebo.storeData(this.defaultIndices.length, this.defaultIndices);
    const location = shaderProgram.getLocation("coordinates");
    this.vao.storeData("coordinates", location, this.defaultBuffer, 3);
  }
}
