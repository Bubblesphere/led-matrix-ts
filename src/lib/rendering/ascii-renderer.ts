import Renderer from "./renderer";
import { PanelDisplay } from "../types";

type AsciiRendererParameter = {
  element: HTMLElement,
  characterBitOn?: string,
  characterBitOff?: string
}

export default class AsciiRenderer extends Renderer {
  private parameters: AsciiRendererParameter;

  constructor(parameters: AsciiRendererParameter) {
    super();
    this.parameters = {
      element: parameters.element,
      characterBitOn: parameters.characterBitOn ? parameters.characterBitOn : "X",
      characterBitOff: parameters.characterBitOff ? parameters.characterBitOff : " "
    };
  }

  public get Parameter() {
    return this.parameters;
  }

  render(display: PanelDisplay): void {
    let output = "";
    for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          output += display[i][j] == 1 ? 
            this.parameters.characterBitOn: 
            this.parameters.characterBitOff;
        }
      output += '\n';
    }
    this.parameters.element.innerHTML = output; 
  }
}