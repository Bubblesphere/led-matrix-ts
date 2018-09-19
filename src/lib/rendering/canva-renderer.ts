import { PanelDisplay } from "../../lib/types";
import Renderer from "./renderer";

export type CanvaRendererParameter = {
  canva: HTMLCanvasElement,
  colorBitOn?: string,
  colorBitOff?: string,
  colorStrokeOn?: string,
  colorStrokeOff?: string
}

export default abstract class CanvaRenderer extends Renderer {
  protected parameters: CanvaRendererParameter;

  constructor(parameters: CanvaRendererParameter) {
    super();
    this.parameters = {
      canva: parameters.canva,
      colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
      colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
      colorStrokeOn: parameters.colorStrokeOn ? parameters.colorStrokeOn : "#67809F",
      colorStrokeOff: parameters.colorStrokeOff ? parameters.colorStrokeOff : "#67809F"
    };
    this.parameters.canva.getContext('2d').clearRect(0, 0, this.parameters.canva.width, this.parameters.canva.height);
 }

  render(display: PanelDisplay): void {
    const ctx = this.parameters.canva.getContext("2d");
    const widthEachBit = Math.floor(this.parameters.canva.width / display[0].length);
    const heightEachBit = Math.floor(this.parameters.canva.height / display.length);
 
    ctx.lineWidth = 1;

    const renderBitsOfValue = (value: number, fillColor: string, strokeColor: string) => {
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          if (display[i][j] == value) {
            this.moveToNextBit(ctx, i, j, widthEachBit, heightEachBit);
            this.drawBit(ctx, i, j, widthEachBit, heightEachBit);
          }
        }
      }
      ctx.fill();
      ctx.stroke();
    }

    renderBitsOfValue(0, this.parameters.colorBitOff, this.parameters.colorStrokeOff);
    renderBitsOfValue(1, this.parameters.colorBitOn, this.parameters.colorStrokeOn);
  }

  abstract moveToNextBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
  abstract drawBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
