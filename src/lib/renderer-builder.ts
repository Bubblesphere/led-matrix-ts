import { CanvaRenderers } from "./rendering/canva-renderers";
import { AsciiRenderer } from "./rendering/ascii-renderer";
import { Renderer, IRenderer,  } from "./rendering/renderer";
export enum RendererType {
    ASCII,
    CanvasSquare,
    CanvasCircle
}

export class RendererBuilder {
    static build(rendererType: RendererType, element: HTMLElement) : IRenderer {
        switch(rendererType) {
            case RendererType.ASCII:
                return new AsciiRenderer({
                    element: element
                });
            case RendererType.CanvasSquare:
                return new CanvaRenderers.Rect({
                    element: element
                });
            case RendererType.CanvasCircle:
                return new CanvaRenderers.Ellipse({
                    element: element
                })
        }
    }
}