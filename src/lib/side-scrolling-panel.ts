import Panel from "./panel";
import { bit } from "./types";
import Board from "./board";

export default class SideScrollingPanel extends Panel {
  protected _generateDisplay(): void {
    for(let i = 0; i < this._width; i++) {
      let column: Array<bit>;
      column = this._board.getAtIndex(this._index + i);
      
      for(let j = 0; j < this._height; j++) {
        this._display[j][i] = column[j];
      }
    }
  }
}