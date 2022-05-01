import { Shader } from "./Shader";

export class ShaderProgram {
  program: WebGLProgram;
  shaders: {
    [key: number]: Shader;
  } = {};

  constructor(private gl: WebGL2RenderingContext) {
    this.create();
  }

  addShader(shader: Shader) {
    this.shaders[shader.type] = shader;
  }

  create() {
    const newProgram = this.gl.createProgram();

    if (!newProgram)
      throw new Error("[ShaderProgram] : Couldn't create a new shader program");

    this.program = newProgram;

    Object.values(this.shaders).forEach((shader) => {
      this.gl.attachShader(this.program, shader.shader);
    });
    this.gl.linkProgram(this.program);
  }

  use() {
    this.gl.useProgram(this.program);
  }

  getAttribLocation(attrib: string) {
    return this.gl.getAttribLocation(this.program, attrib);
  }

  getUniformLocation(uniform: string){
    return this.gl.getUniformLocation(this.program, uniform);
  }

  log(){
    Object.values(this.shaders).filter((shader) => !shader.success).forEach((shader) => {
      console.log(shader.infoLog);
    });
  }
  
}
