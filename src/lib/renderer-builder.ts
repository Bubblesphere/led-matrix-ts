import { CanvaRenderers } from "./rendering/canva-renderers";
import { AsciiRenderer } from "./rendering/ascii-renderer";
import { Renderer,  } from "./rendering/renderer";
export enum RendererType {
    ASCII,
    CanvasSquare,
    CanvasCircle
}

export class RendererBuilder {
    static build(rendererType: RendererType, elementId: string) : Renderer {
        switch(rendererType) {
            case RendererType.ASCII:
                return new AsciiRenderer({
                    elementId: elementId
                });
            case RendererType.CanvasSquare:
                return new CanvaRenderers.Rect({
                    elementId: elementId
                });
            case RendererType.CanvasCircle:
                return new CanvaRenderers.Ellipse({
                    elementId: elementId
                })
        }
    }
}