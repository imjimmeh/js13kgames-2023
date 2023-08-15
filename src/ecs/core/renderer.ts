export class Renderer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;

  constructor() {
    const canvas = document.querySelector("canvas");

    if (!canvas) throw "Could not find canvas";

    this._canvas = canvas;
    this._context = this._canvas.getContext("2d")!;
  }

  get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  init() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

let _instance: Renderer | null = null;

export const instance = (): Renderer => {
  if (!_instance) {
    _instance = new Renderer();
  }

  return _instance;
};
