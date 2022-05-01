export interface Canvas {
  init: () => CanvasRenderingContext2D;
  clearColor: (fillStyle: string | CanvasGradient | CanvasPattern) => void;
}
