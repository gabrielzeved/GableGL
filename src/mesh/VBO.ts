export class VBO {
  attribute: string;
  vbo: WebGLBuffer;

  constructor(private gl: WebGL2RenderingContext, attribute: string) {
    const newVbo = this.gl.createBuffer();
    if (!newVbo) throw new Error("[VBO] : Couldn't create a new VBO");
    this.vbo = newVbo;
    this.attribute = attribute;
  }

  bind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo);
  }

  storeData(data: BufferSource, usage: number = this.gl.STATIC_DRAW) {
    this.bind();
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, usage);
  }

  unbind() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }
}
