import { vec2 } from "gl-matrix";

export class Texture {
  id: WebGLTexture;
  target: number;
  size: vec2;
  ready: boolean = false;

  constructor(private gl: WebGL2RenderingContext, target: number) {
    this.target = target;
    const newTexture = gl.createTexture();
    if (!newTexture)
      throw new Error("[Texture] : Couldn't create a new texture");

    this.id = newTexture;
  }

  bind() {
    this.gl.bindTexture(this.target, this.id);
  }

  unbind() {
    this.gl.bindTexture(this.target, null);
  }

  prepare(active_texture : number = this.gl.TEXTURE0){
    this.gl.activeTexture(active_texture);
    this.bind();
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
  }

  async load(url: string){
    const image = new Image();
    image.onload = () => {
      this.loadData(image.width, image.height, image);
      this.size = [image.width, image.height];
    }
    image.src = url;
    await image.decode();
    this.ready = true;
  }

  loadData(width: number, height: number, data: TexImageSource) {
    this.bind();
    this.gl.texImage2D(this.target,0,this.gl.RGBA,width,height,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,data);
    this.unbind();
  }

}
