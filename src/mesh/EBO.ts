export class EBO {
  ebo: WebGLBuffer;
  couht: number;

  constructor(private gl: WebGL2RenderingContext) {
    const newVbo = this.gl.createBuffer();
    if (!newVbo) throw new Error("[EBO] : Couldn't create a new VBO");
    this.ebo = newVbo;
  }

  bind() {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.ebo);
  }

  storeData(count: number, data: BufferSource) {
    this.bind();
    this.couht = count;
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
  }

  unbind() {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }
}
