import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel, PanelParameters } from "../panel";

export default class VerticalScrollingPanel extends Panel {
  constructor(params: PanelParameters) {
    super(params);
  }
  
  public get indexUpperBound(): number {
    return this.board.height - 1;
  }

  protected _generatePanelFrameAtIndex(currentIndex: number): PanelFrame {
    let display: PanelFrame = [];
    for(let i = 0; i < this.board.height; i++) {
      let row: Array<bit>;
      row = this.board.getRowAtIndex(currentIndex + i);
      display.push(row.slice(0, this.width));
    }
    return display;
  }
}