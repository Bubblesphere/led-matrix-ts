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
  private parameters: CanvaRendererParameter;

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
    
    // Render the different canvas once before instead of recalculating every loop
    const prerenderedBitOn = this._prerenderBit(widthEachBit, heightEachBit, this.parameters.colorBitOn);
    const prerenderedBitOff = this._prerenderBit(widthEachBit, heightEachBit, this.parameters.colorBitOff);

    for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        const x = j*widthEachBit;
        const y = i*heightEachBit;
        ctx.drawImage(display[i][j] == 1 ? prerenderedBitOn : prerenderedBitOff, x, y);
      }
    }
  }

  private _prerenderBit(widthEachBit: number, heightEachBit: number, color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = widthEachBit;
    canvas.height = heightEachBit;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = color;
    this.drawBit(ctx, 0, 0, widthEachBit, heightEachBit);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.parameters.colorStroke;
    ctx.stroke();

    return canvas;
  }

  abstract drawBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}