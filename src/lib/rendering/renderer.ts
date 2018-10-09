import { PanelFrame } from "../types";

export abstract class Renderer<T extends IRendererParameters> implements IRenderer {
  protected _parameters: T;

  constructor(parameters: T) {

    if (parameters.element == null) {
      throw `Could not find the element to render led matrix`;
    } else {
      this._parameters = {
        element: parameters.element
      } as T
    }
  }
  abstract render(display: PanelFrame): void;
  abstract get parameters(): T;
}

export interface IRenderer {
  render(display: PanelFrame): void;
}

export interface IRendererParameters {
  element: HTMLElement
}