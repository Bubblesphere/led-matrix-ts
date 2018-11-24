import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel } from "../panel";
import { Scroller } from "./scroller";

export class SideScroller implements Scroller {
  public loopEndIndex(params: Panel): number {
    return params.board.width - 1;
  }

  public generatePanelFrameAtIndex(currentIndex: number, panel: Panel): PanelFrame {
    // Get all the columns involved in the next PanelFrame
    let columns: bit[][] = [];
    for(let i = 0; i < panel.width; i++) {
      columns.push(panel.board.getColumnAtIndex(currentIndex + i));
    }

    // Build the panel frame from the columns
    let panelFrame: PanelFrame = [];
    for(let i = 0; i < columns[0].length; i++) {
      panelFrame.push(columns.map(x => x[i]));
    }

    return panelFrame;
  }
}