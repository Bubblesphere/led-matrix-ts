import Board from './board';

export default class ScrollingMatrix {
  private _index: number;
  // TODO: Have distinctive width and height
  private _width: number;
  private _display: Array<Array<number>>;
  private _speedBuffer: number;
  private _speed: number;
  
  constructor(speed: number) {
    this._index = 0;
    this._width = 8;
    this._display = [];
    this._speed = speed;
  }
  
  private _rotateDisplayRight90() {
    this._display.reverse();
    for (var i = 0; i < this._display.length; i++) {
      for (var j = 0; j < i; j++) {
        const temp = this._display[i][j];
        this._display[i][j] = this._display[j][i];
        this._display[j][i] = temp;
      }
    }
  }

  play(board: Board): string {
    if (this._index > board.boardLength() - this._width) {
      this._index = 0;
    }

    this._display.splice(0, this._display.length);
    for(let i = 0; i < this._width; i++) {
      this._display.push(board.getAtIndex(this._index + i));
    }

    // TODO: Fix bug
    //this._rotateDisplayRight90();

    let output = "";
    for (let i = 0; i < this._width; i++) {
      for (let j = 0; j < this._width; j++) {
        output += this._display[i][j]
      }
      output += '\n';
    }

    this._index++;

    return output;
  }

  loop(board: Board, callback: (output: string) => any) {
      setInterval(function() {
        callback(this.play(board));
      }.bind(this), this._speed);    
  }
};