export class Shader {
  source: string;
  type: number;

  success: boolean;
  infoLog: string;

  shader: WebGLShader;

  constructor(
    private gl: WebGL2RenderingContext,
    source: string,
    type: number
  ) {
    this.source = source;
    this.type = type;
    this.create();
    this.validate();
  }

  create() {
    const newShader = this.gl.createShader(this.type);

    if (!newShader) throw new Error("[Shader] : Could'nt create a new shader");

    this.shader = newShader;

    this.gl.shaderSource(this.shader, this.source);
    this.gl.compileShader(this.shader);
  }

  validate() {
    this.success = this.gl.getShaderParameter(
      this.shader,
      this.gl.COMPILE_STATUS
    );

    if (!this.success) {
      this.infoLog = this.gl.getShaderInfoLog(this.shader) || "";
      this.gl.deleteShader(this.shader);
    }
  }
}
