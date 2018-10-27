import { Renderer, IRendererParameters } from "./renderer";
import { PanelFrame } from "../types";

export interface AsciiRendererParameter extends IRendererParameters  {
  characterBitOn?: string,
  characterBitOff?: string
}

export class AsciiRenderer extends Renderer {
  protected _parameters: AsciiRendererParameter;

  constructor(parameters: AsciiRendererParameter) {
    super(parameters);
    this._parameters = {
      elementId: parameters.elementId,
      element: parameters.element,
      characterBitOn: parameters.characterBitOn ? parameters.characterBitOn : "X",
      characterBitOff: parameters.characterBitOff ? parameters.characterBitOff : " "
    };
  }

  public get parameters() {
    return this._parameters;
  }

  render(display: PanelFrame): void {
    super.render(display);
    let output = "";
    for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          output += display[i][j] == 1 ? 
            this._parameters.characterBitOn: 
            this._parameters.characterBitOff;
        }
      output += '\n';
    }
    this._parameters.element.innerHTML = output; 
  }
}