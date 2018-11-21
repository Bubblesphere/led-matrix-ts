import { bit } from "../bit-array";
import { PanelFrame } from "../types";
import { PanelSequencer, PanelSequencerParameters } from "../panel-sequencer";

export class SideScrollingPanel extends PanelSequencer {
  constructor(params: PanelSequencerParameters) {
    super(params);
  }
  
  public get indexUpperBound(): number {
    return this.board.width - 1;
  }

  protected _generateDisplay(currentIndex: number): PanelFrame {
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