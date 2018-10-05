import { PanelFrame } from "../types";

export abstract class Renderer  {
  protected _parameters: IRendererParameters;

  constructor(parameters: IRendererParameters) {
    if (parameters.element == null) {
      throw `Could not find the element to render led matrix`;
    } else {
      this._parameters = {
        element: parameters.element
      }
    }
  }
  abstract render(display: PanelFrame): void;
  abstract get parameters(): IRendererParameters;
}
/*
export interface IRenderer<T> {
  render(display: PanelFrame): void;
  parameters: IRendererParameters;
  build(): T;
  isNotInitiliazed: boolean;
}
*/
export interface IRendererParameters {
  element: HTMLElement
}