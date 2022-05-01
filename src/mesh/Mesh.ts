import { ShaderProgram } from "../shader/ShaderProgram";
import { Texture } from "../texture/Texture";
import { EBO } from "./EBO";
import { VAO } from "./VAO";

export class Mesh {
  vao: VAO;
  ebo: EBO;
  indicesCount: number;
  texture ?: Texture;

  constructor(private gl: WebGL2RenderingContext) {
    this.vao = new VAO(this.gl);
    this.ebo = new EBO(this.gl);
  }

  addTexture(texture: Texture){
    this.texture = texture;
  }

  draw(shaderProgram: ShaderProgram) {
    this.vao.bind();
    this.vao.enable(shaderProgram);

    if(this.texture)
      this.texture.prepare();

    this.ebo.bind();

    this.gl.drawElements(
      this.gl.TRIANGLES,
      this.ebo.couht,
      this.gl.UNSIGNED_SHORT,
      0
    );

    if(this.texture)
      this.texture.unbind();

    this.ebo.unbind();
    this.vao.unbind();
  }
}
