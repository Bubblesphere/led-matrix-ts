import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel, PanelParameters } from "../panel";

export default class SideScrollingPanel extends Panel {
  constructor(params: PanelParameters) {
    super(params);
  }
  
  public get indexUpperBound(): number {
    return this.board.width - 1;
  }

  protected _generatePanelFrameAtIndex(currentIndex: number): PanelFrame {
    let columns: bit[][] = [];
    for(let i = 0; i < this.width; i++) {
      columns.push(this.board.getColumnAtIndex(currentIndex + i));
    }

    let display: bit[][] = [];
    for(let i = 0; i < columns[0].length; i++) {
      display.push(columns.map(x => x[i]));
    }
    return display;
  }
}