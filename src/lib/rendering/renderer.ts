import { PanelFrame } from "../types";

export abstract class Renderer {
  protected _parameters: IRendererParameters;

  constructor(parameters: IRendererParameters) {
  }
  
  render(display: PanelFrame): void {
    if (this._parameters.element == null) {
      throw `Could not find the element to render led matrix`;
    } else {
      this._parameters = {
        element: this._parameters.element
      }
    }
  }
  abstract get parameters(): IRendererParameters;
}
/*
export interface IRenderer<T extends IRendererParameters> {
  render(display: PanelFrame): void;
  parameters(): T;
}
*/

export interface IRendererParameters {
  element: HTMLElement
}