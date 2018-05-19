import Panel from "../panel";
import { bit } from "../bit-array";


export default class SideScrollingPanel extends Panel {
  protected _generateDisplay(): void {
    for(let i = 0; i < this.width; i++) {
      let column: Array<bit>;
      column = this.board.getAtIndex(this.index + i);
      
      for(let j = 0; j < this.height; j++) {
        this.display[j][i] = column[j];
      }
    }
  }
}