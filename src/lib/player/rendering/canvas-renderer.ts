import { PanelFrame } from "../../types";
import { Renderer, IRendererParameters } from "./renderer";

export interface CanvasRendererParameter extends IRendererParameters {
  colorBitOn?: string,
  colorBitOff?: string,
  colorStrokeOn?: string,
  colorStrokeOff?: string
}

export abstract class CanvasRenderer extends Renderer   {
  protected _parameters: CanvasRendererParameter;

  constructor(parameters: CanvasRendererParameter) {
    super(parameters);
    this._parameters = {
      elementId: parameters.elementId,
      element: parameters.element,
      colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
      colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
      colorStrokeOn: parameters.colorStrokeOn ? parameters.colorStrokeOn : "#67809F",
      colorStrokeOff: parameters.colorStrokeOff ? parameters.colorStrokeOff : "#67809F"
    };
  }

  public get parameters() {
    return this._parameters
  }

  private get element() {
    return this._parameters.element as HTMLCanvasElement
  }

  render(display: PanelFrame): void {
    super.render(display);
    const ctx = this.element.getContext("2d");

    if (this.element.width != this.element.clientWidth && this.element.clientWidth != 0) {
      this.element.width = this.element.clientWidth;
    }

    if (this.element.height != this.element.clientHeight && this.element.clientHeight != 0) {
      this.element.height = this.element.clientHeight;
    }

    ctx.clearRect(0, 0, this.element.width, this.element.height);
    const widthEachBit = Math.floor(this.element.width / display[0].length);
    const heightEachBit = Math.floor(this.element.height / display.length);
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

    renderBitsOfValue(0, this._parameters.colorBitOff, this._parameters.colorStrokeOff);
    renderBitsOfValue(1, this._parameters.colorBitOn, this._parameters.colorStrokeOn);
  }

  abstract moveToNextBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
  abstract drawBit(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void;
}
