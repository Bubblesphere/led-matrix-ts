import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel } from "../panel";
import { Scroller } from "./scroller";

export class VerticalScroller implements Scroller {
  public loopEndIndex(panel: Panel): number {
    return panel.board.height - 1;
  }

  public generatePanelFrameAtIndex(currentIndex: number, panel: Panel): PanelFrame {
    let display: PanelFrame = [];
    for(let i = 0; i < panel.board.height; i++) {
      let row: Array<bit>;
      row = panel.board.getRowAtIndex(currentIndex + i);
      display.push(row.slice(0, panel.width));
    }
    return display;
  }
}