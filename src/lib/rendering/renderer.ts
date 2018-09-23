import { PanelDisplay } from "../types";

export default abstract class Renderer {
  abstract render(display: PanelDisplay): void;
  abstract get parameters(): any;
}