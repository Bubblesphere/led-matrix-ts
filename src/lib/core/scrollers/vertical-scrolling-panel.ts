import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel, PanelParameters } from "../panel";
import { Scroller } from "./scroller-builder";

export default class VerticalScrollingPanel implements Scroller {
  public indexUpperBound(params: PanelParameters): number {
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