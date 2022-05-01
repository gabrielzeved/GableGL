import { ShaderProgram } from "../shader/ShaderProgram";
import { EBO } from "./EBO";
import { VAO } from "./VAO";

export class Mesh {
  vao: VAO;
  ebo: EBO;
  indicesCount: number;

  constructor(private gl: WebGL2RenderingContext) {
    this.vao = new VAO(this.gl);
    this.ebo = new EBO(this.gl);
  }

  draw(shaderProgram: ShaderProgram) {
    this.ebo.bind();
    this.vao.bind();

    this.vao.enable(shaderProgram);
    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.ebo.couht,
      this.gl.UNSIGNED_SHORT,
      0
    );
    this.ebo.unbind();
    this.vao.unbind();
  }
}
