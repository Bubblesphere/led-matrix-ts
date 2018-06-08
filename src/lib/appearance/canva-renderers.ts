import CanvaRenderer, { CanvaRendererParameter } from "./canva-renderer";

export namespace CanvaRenderers {
  export class Ellipse extends CanvaRenderer {
    constructor(parameters: CanvaRendererParameter) {
      super(parameters)
    }
    
    drawBit(context: CanvasRenderingContext2D, x: any, y: any, width: any, height: any): void {
      const halfWBit = width / 2;
      const halfHBit = height / 2;
      context.ellipse(x +  halfWBit, y + halfHBit, halfWBit, halfHBit, 0, 0, 2 * Math.PI);
    }
  }

  export class Rect extends CanvaRenderer {
    constructor(parameters: CanvaRendererParameter) {
      super(parameters)
    }
    
    drawBit(context: CanvasRenderingContext2D, x: any, y: any, width: any, height: any): void {
      return context.rect(x, y, width, height);
    }
  }
}
