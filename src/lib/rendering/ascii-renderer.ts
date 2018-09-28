import { Renderer } from "./renderer";
import { PanelFrame } from "../types";

type AsciiRendererParameter = {
  element: HTMLElement,
  characterBitOn?: string,
  characterBitOff?: string
}

export class AsciiRenderer extends Renderer {
  private _parameters: AsciiRendererParameter;

  constructor(parameters: AsciiRendererParameter) {
    super();
    this._parameters = {
      element: parameters.element,
      characterBitOn: parameters.characterBitOn ? parameters.characterBitOn : "X",
      characterBitOff: parameters.characterBitOff ? parameters.characterBitOff : " "
    };
  }

  public get parameters() {
    return this._parameters;
  }

  render(display: PanelFrame): void {
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