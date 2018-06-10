import Renderer from "./renderer";
import { PanelDisplay } from "../types";

type AsciiRendererParameter = {
  element: HTMLElement,
  characterBitOn?: string,
  characterBitOff?: string
}

export default class AsciiRenderer extends Renderer {
  private parameter: AsciiRendererParameter;

  constructor(parameter: AsciiRendererParameter) {
    super();
    this.parameter = parameter;
  }

  public get Parameter() {
    return this.parameter;
  }

  render(display: PanelDisplay): void {
    let output = "";
    for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          output += display[i][j] == 1 ? 
            this.parameter.characterBitOn ? this.parameter.characterBitOn[0] : 'X' : 
            this.parameter.characterBitOff ? this.parameter.characterBitOff[0] : ' ';
        }
      output += '\n';
    }
    this.parameter.element.innerHTML = output; 
  }
}