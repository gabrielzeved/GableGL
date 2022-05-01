import { ShaderProgram } from "../shader/ShaderProgram";
import { VBO } from "./VBO";

export class VAO {
  vao: WebGLVertexArrayObject;
  vbos: VBO[] = [];

  constructor(private gl: WebGL2RenderingContext) {
    const newVao = this.gl.createVertexArray();
    if (!newVao) throw new Error("[VAO] : Couldn't create a new VAO");
    this.vao = newVao;
  }

  bind() {
    this.gl.bindVertexArray(this.vao);
  }

  unbind() {
    this.gl.bindVertexArray(null);
  }

  enable(shaderProgram: ShaderProgram) {
    this.vbos.forEach((vbo) => {
      const location = shaderProgram.getLocation(vbo.attribute);
      this.gl.enableVertexAttribArray(location);
    });
  }

  disable(shaderProgram: ShaderProgram) {
    this.vbos.forEach((vbo) => {
      const location = shaderProgram.getLocation(vbo.attribute);
      this.gl.disableVertexAttribArray(location);
    });
  }

  storeData(
    attribute: string,
    attributeLocation: number,
    data: BufferSource,
    dimension: number
  ) {
    this.bind();

    const vbo = new VBO(this.gl, attribute);
    vbo.storeData(data);
    this.vbos.push(vbo);

    this.gl.vertexAttribPointer(
      attributeLocation,
      dimension,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }
}
