import { ShaderProgram } from "../shader/ShaderProgram";
import { Mesh } from "./Mesh";

export class Quad extends Mesh {
  
  defaultBuffer = new Float32Array([
     0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0,
    -0.5,  0.5, 0.0,
  ]);

  defaultIndices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  defaultTexCoords = new Float32Array([
    1.0, 1.0,
    1.0, 0.0,
    0.0, 0.0,  
    0.0, 1.0,
  ]);

  constructor(gl: WebGL2RenderingContext, shaderProgram: ShaderProgram) {
    super(gl);
    this.ebo.storeData(this.defaultIndices.length, this.defaultIndices);
    
    this.vao.storeData("coordinates", shaderProgram.getAttribLocation("coordinates"), this.defaultBuffer, 3);
    
    this.vao.storeData("texCoords", shaderProgram.getAttribLocation("texCoords"), this.defaultTexCoords, 2);
  }
}
