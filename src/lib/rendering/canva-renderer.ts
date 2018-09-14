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
  private _prerenderedOn: HTMLCanvasElement;
  private _prerenderedOff: HTMLCanvasElement;


  constructor(parameters: CanvaRendererParameter) {
    super();
    this.parameters = {
      canva: parameters.canva,
      colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
      colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
      colorStroke: parameters.colorStroke ? parameters.colorStroke : "#67809F"
    };
    this._prerenderedOn = document.createElement('canvas');
    this._prerenderedOff = document.createElement('canvas');
  }

  render(display: PanelDisplay): void {
    const ctx = this.parameters.canva.getContext("2d");
    const widthEachBit = Math.floor(this.parameters.canva.width / display[0].length);
    const heightEachBit = Math.floor(this.parameters.canva.height / display.length);
    
    // Render the different canvas once before instead of recalculating every loop
    const prerenderedBitOn = this._prerenderBit(this._prerenderedOn, widthEachBit, heightEachBit, this.parameters.colorBitOn);
    const prerenderedBitOff = this._prerenderBit(this._prerenderedOff, widthEachBit, heightEachBit, this.parameters.colorBitOff);

    for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        const x = j*widthEachBit;
        const y = i*heightEachBit;
        ctx.drawImage(display[i][j] == 1 ? prerenderedBitOn : prerenderedBitOff, x, y);
      }
    }
  }

  private _prerenderBit(canvas: HTMLCanvasElement, widthEachBit: number, heightEachBit: number, color: string) {
    canvas.width = widthEachBit;
    canvas.height = heightEachBit;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(0, 0, widthEachBit, heightEachBit);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.parameters.colorStroke;
    ctx.stroke();

    return canvas;
  }

  abstract drawBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
