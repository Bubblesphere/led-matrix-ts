import { PanelRenderer, PanelDisplay } from "../../lib/types";
import { bit } from "../../lib/bit-array";
import Renderer from "./renderer";

export enum CanvaRendererShape {
  Square,
  Circle
}

type CanvaRendererParameter = {
  canva: HTMLCanvasElement,
  colorBitOn?: string,
  colorBitOff?: string,
  colorStroke?: string,
  shape?: CanvaRendererShape
}

export default class CanvaRenderer extends Renderer {
  private parameters: CanvaRendererParameter;
  private widthEachBit: number;
  private heightEachBit: number;

  constructor(parameters: CanvaRendererParameter) {
    super();
    this.parameters = {
      canva: parameters.canva,
      colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
      colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
      colorStroke: parameters.colorStroke ? parameters.colorStroke : "#67809F",
      shape: parameters.shape ? parameters.shape : CanvaRendererShape.Square
    };
  }

  render(display: PanelDisplay): void {
    const ctx = this.parameters.canva.getContext("2d");
    const widthEachBit = Math.floor(this.parameters.canva.width / display[0].length);
    const heightEachBit = Math.floor(this.parameters.canva.height / display.length);

    for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {

        ctx.beginPath();

        ctx.fillStyle= display[i][j] == 1 ? 
          this.parameters.colorBitOn : 
          this.parameters.colorBitOff;

        const x = j*widthEachBit;
        const y = i*heightEachBit;

        if (this.parameters.shape === CanvaRendererShape.Circle) { 
          const halfWBit = widthEachBit / 2;
          const halfHBit = heightEachBit / 2;
          ctx.ellipse(x +  halfWBit, y + halfHBit, halfWBit, halfHBit, 0, 0, 2 * Math.PI);         
        } else if (this.parameters.shape === CanvaRendererShape.Square) {
          ctx.rect(x, y, widthEachBit, heightEachBit);
        }

        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.parameters.colorStroke;
        ctx.stroke();
      }
  }
  }
}