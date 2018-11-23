import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { PanelParameters } from "../panel";
import { Scroller } from "./scroller";

export default class SideScroller implements Scroller {

  public loopEndIndex(params: PanelParameters): number {
    return params.board.width - 1;
  }

  public generatePanelFrameAtIndex(currentIndex: number, params: PanelParameters): PanelFrame {
    // Get all the columns involved in the next PanelFrame
    let columns: bit[][] = [];
    for(let i = 0; i < params.width; i++) {
      columns.push(params.board.getColumnAtIndex(currentIndex + i));
    }

    // Build the panel frame from the columns
    let panelFrame: PanelFrame = [];
    for(let i = 0; i < columns[0].length; i++) {
      panelFrame.push(columns.map(x => x[i]));
    }
    
    return panelFrame;
  }
}