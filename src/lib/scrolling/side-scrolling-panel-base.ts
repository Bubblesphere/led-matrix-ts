import Panel from "../panel";
import { bit } from "../bit-array";

export default abstract class SideScrollingPanelBase extends Panel {
  abstract reverse: boolean;
  indexUpperBound: number = this.board.width;

  protected _generateDisplay(): void {
    for(let i = 0; i < this.width; i++) {
      let column: Array<bit>;
      column = this.board.getColumnAtIndex(this.index + i);
      
      for(let j = 0; j < this.height; j++) {
        this.display[j][i] = column[j];
      }
    }
  }
}