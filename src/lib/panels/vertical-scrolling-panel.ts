import { bit } from "../bit-array";
import { Panel } from "../panel";

export class VerticalScrollingPanel extends Panel {
  public get indexUpperBound(): number {
    return this.board.height - 1;
  }

  protected _generateDisplay(currentIndex: number): void {
    for(let i = 0; i < this.board.height; i++) {
      let row: Array<bit>;
      row = this.board.getRowAtIndex(currentIndex + i);
      this.display[i] = row.slice(0, this.width);
    }
  }
}