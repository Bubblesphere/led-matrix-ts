import { PanelFrame } from "../types";

export default abstract class Renderer {
  abstract render(display: PanelFrame): void;
  abstract get parameters(): any;
}