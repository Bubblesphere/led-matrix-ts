import { bit } from "../../utils/bit-array";
import { PanelFrame } from "../../types";
import { Panel, PanelParameters } from "../panel";
import { Scroller } from "./scroller-builder";



export default class SideScrollingPanel implements Scroller {

  public indexUpperBound(params: PanelParameters): number {
    return params.board.width - 1;
  }

  public generatePanelFrameAtIndex(currentIndex: number, params: PanelParameters): PanelFrame {
    let columns: bit[][] = [];
    for(let i = 0; i < params.width; i++) {
      columns.push(params.board.getColumnAtIndex(currentIndex + i));
    }

    let display: bit[][] = [];
    for(let i = 0; i < columns[0].length; i++) {
      display.push(columns.map(x => x[i]));
    }
    return display;
  }
}