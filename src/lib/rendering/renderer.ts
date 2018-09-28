import { PanelFrame } from "../types";

export abstract class Renderer {
  abstract render(display: PanelFrame): void;
  abstract get parameters(): any;
}