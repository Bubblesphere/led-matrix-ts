import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import {  PanelParameters } from "../panel";
import { Scroller } from "./scroller";

export default class VerticalScroller implements Scroller {
  public loopEndIndex(params: PanelParameters): number {
    return params.board.height - 1;
  }

  public generatePanelFrameAtIndex(currentIndex: number, params: PanelParameters): PanelFrame {
    let display: PanelFrame = [];
    for(let i = 0; i < params.board.height; i++) {
      let row: Array<bit>;
      row = params.board.getRowAtIndex(currentIndex + i);
      display.push(row.slice(0, params.width));
    }
    return display;
  }
}