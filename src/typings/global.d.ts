export {};

declare global {
  type Maybe<T> = T | undefined | null;
  const GL = WebGL2RenderingContext;
}
