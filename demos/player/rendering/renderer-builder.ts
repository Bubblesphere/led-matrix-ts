import { CanvasRenderers } from "./canvas-renderers";
import { AsciiRenderer } from "./ascii-renderer";
import { Renderer } from "./renderer";

export enum RendererTypes {
  ASCII,
  CanvasSquare,
  CanvasCircle
}

export class RendererBuilder {
  static build(rendererType: RendererTypes, elementId: string): Renderer {
    switch (rendererType) {
      case RendererTypes.ASCII:
        return new AsciiRenderer({
          elementId: elementId
        });
      case RendererTypes.CanvasSquare:
        return new CanvasRenderers.Rect({
          elementId: elementId
        });
      case RendererTypes.CanvasCircle:
        return new CanvasRenderers.Ellipse({
          elementId: elementId
        })
    }
  }
}