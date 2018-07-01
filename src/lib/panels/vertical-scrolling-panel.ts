import { bit } from "../bit-array";
import Panel from "../panel";

export default class VerticalScrollingPanel extends Panel {
  indexUpperBound: number = 8;

  protected _generateDisplay(): void {
    for(let i = 0; i < this.height; i++) {
      let row: Array<bit>;
      row = this.board.getRowAtIndex(this.index + i);
      this.display[i] = row.slice(0, this.width);
    }
  }
}