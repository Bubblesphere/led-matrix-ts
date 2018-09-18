import { PanelRenderer, PanelDisplay } from "../../lib/types";
import { bit } from "../../lib/bit-array";
import Renderer from "./renderer";

export type CanvaRendererParameter = {
  canva: HTMLCanvasElement,
  colorBitOn?: string,
  colorBitOff?: string,
  colorStroke?: string
}

export default abstract class CanvaRenderer extends Renderer {
  protected parameters: CanvaRendererParameter;

  constructor(parameters: CanvaRendererParameter) {
    super();
    this.parameters = {
      canva: parameters.canva,
      colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
      colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
      colorStroke: parameters.colorStroke ? parameters.colorStroke : "#67809F"
    };
    this.parameters.canva.getContext('2d').clearRect(0, 0, this.parameters.canva.width, this.parameters.canva.height);
 }

  render(display: PanelDisplay): void {
    const ctx = this.parameters.canva.getContext("2d");
    const widthEachBit = Math.floor(this.parameters.canva.width / display[0].length);
    const heightEachBit = Math.floor(this.parameters.canva.height / display.length);
    this.parameters.canva.getContext('2d').clearRect(0, 0, this.parameters.canva.width, this.parameters.canva.height);
 
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.parameters.colorStroke;

    ctx.fillStyle = this.parameters.colorBitOff;
    ctx.beginPath();
    for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        this.moveToNextBit(ctx, i, j, widthEachBit, heightEachBit);
        this.drawBit(ctx, i, j, widthEachBit, heightEachBit);
      }
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = this.parameters.colorBitOn;
    ctx.beginPath();
    for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        if (display[i][j] == 1) {
          this.moveToNextBit(ctx, i, j, widthEachBit, heightEachBit);
          this.drawBit(ctx, i, j, widthEachBit, heightEachBit);
        }
      }
    }
    ctx.fill();
    ctx.stroke();

  }

  abstract moveToNextBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
  abstract drawBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
