import { bit } from "../bit-array";
import { PanelSequencer, PanelSequencerParameters } from "../panel-sequencer";
import { PanelFrame } from "../types";

export class VerticalScrollingPanel extends PanelSequencer {
  constructor(params: PanelSequencerParameters) {
    super(params);
  }
  
  public get indexUpperBound(): number {
    return this.board.height - 1;
  }

  protected _generateDisplay(currentIndex: number): PanelFrame {
    let display: PanelFrame = [];
    for(let i = 0; i < this.board.height; i++) {
      let row: Array<bit>;
      row = this.board.getRowAtIndex(currentIndex + i);
      display.push(row.slice(0, this.width));
    }
    return display;
  }
}