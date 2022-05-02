import { vec2 } from "gl-matrix";
import { Quad } from "../mesh/Quad";
import { ShaderProgram } from "../shader/ShaderProgram";
import { Texture } from "../texture/Texture";

export interface SpriteBoundaries{
  position: vec2;
  size: vec2;
}

export class Sprite extends Quad{
  boundaries: SpriteBoundaries;
  pivot: vec2;

  constructor(boundaries: SpriteBoundaries, imageUrl: string,  gl: WebGL2RenderingContext, shaderProgram: ShaderProgram){
    super(gl, shaderProgram);
    const texture = new Texture(gl, gl.TEXTURE_2D);
    texture.load(imageUrl).then(() => {
      this.addTexture(texture);
      this.setFrame(boundaries);
    })
  }

  setFrame(boundaries: SpriteBoundaries){
    this.boundaries = boundaries;
    const texCoords = this.getTextureCoordinates();
    if(!texCoords) return;
    this.setTexCoords(texCoords);
  }

  getTextureCoordinates(){
    if(!this.texture){
      console.error("[Sprite] this sprite doesn't have a texture bounded")
      return;
    }

    const frame : SpriteBoundaries =  {
      position: [
        this.boundaries.position[0] / this.texture.size[0],
        this.boundaries.position[1] / this.texture.size[1],
      ],
      size: [
        this.boundaries.size[0] / this.texture.size[0],
        this.boundaries.size[1] / this.texture.size[1],
      ],
    }

    return new Float32Array([
      frame.position[0] + frame.size[0], frame.position[1] + frame.size[1],
      frame.position[0] + frame.size[0], frame.position[1],
      frame.position[0], frame.position[1],  
      frame.position[0], frame.position[1] + frame.size[1],
    ]);

  }

}