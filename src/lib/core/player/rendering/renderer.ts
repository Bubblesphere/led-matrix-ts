import { PanelFrame }  from '../../../../index';

export abstract class Renderer {
  protected _parameters: IRendererParameters;

  constructor(parameters: IRendererParameters) {
  }
  
  render(display: PanelFrame): void {
    if (this._parameters.element == null) {
      this._parameters.element = document.getElementById(this._parameters.elementId) as HTMLElement;
      if (this._parameters.element == null) {
        throw `Could not find the element to render led matrix`;
      }
    } else {
      if (this._parameters.element.clientHeight == 0 || this._parameters.element.clientWidth == 0) {
        this._parameters.element = document.getElementById(this._parameters.elementId) as HTMLElement;
      }
    }
  }
  abstract get parameters(): IRendererParameters;
}

export interface IRendererParameters {
  elementId: string
  element?: HTMLElement
}