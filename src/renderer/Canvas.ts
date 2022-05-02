export class Canvas {
  public width: number;
  public height: number;
  public root: HTMLElement;
  public element?: HTMLCanvasElement;
  public context?: WebGL2RenderingContext;

  constructor(width: number, height: number, root: HTMLElement | string) {
    this.width = width;
    this.height = height;

    const rootElement =
      root instanceof HTMLElement
        ? root
        : document.querySelector<HTMLElement>(root as unknown as string);

    if (!rootElement)
      throw new Error(`[Canvas] : Root element not found or provided`);

    this.root = rootElement;
  }

  init() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.element = canvas;
    this.context = canvas.getContext("webgl2")!;
    this.root?.appendChild(canvas);

    if (this.context) this.context.viewport(0, 0, this.width, this.height);

    return this.context;
  }

  clearColor() {
    if (!this.context) throw new Error(`[Canvas] : Canvas not initialized`);

    const gl = this.context;
    gl.clearColor(0, 255, 0, 1);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, this.width, this.height);
  }
}
