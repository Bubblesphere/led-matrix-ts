import { bit } from "../bit-array";
import Panel from "../panel";

export default class SideScrollingPanel extends Panel {
  indexUpperBound: number = this.board.width;

  protected _generateDisplay(): void {
    for(let i = 0; i < this.width; i++) {
      let column: Array<bit>;
      column = this.board.getColumnAtIndex(this.index + i);
      
      for(let j = 0; j < this.board.height; j++) {
        this.display[j][i] = column[j];
      }
    }
  }
}