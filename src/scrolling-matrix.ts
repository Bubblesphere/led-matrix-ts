import Board from './board';

export default class ScrollingMatrix {
  private _index: number;
  private _width: number;
  private _height: number;
  private _display: Array<Array<number>>;
  private _speedBuffer: number;
  private _speed: number;
  
  constructor(speed: number = 100, width: number = 24, height: number = 8) {
    this._index = 0;
    // TODO: Handle large dimensions with short string
    this._width = 24;
    this._height = 8;
    this._display = [];
    this._speed = speed;
  }

  private _generateEmptyDisplay(): void {
    this._display.splice(0, this._display.length);
    for(let i = 0; i < this._height; i++) {
      this._display.push(Array.apply(null, Array(this._width)).map(Number.prototype.valueOf,0));
    }
  }

  play(board: Board): string {
    if (this._index > board.boardLength() - this._width) {
      this._index = 0;
    }

    this._generateEmptyDisplay();


    for(let i = 0; i < this._width; i++) {
      const column = board.getAtIndex(this._index + i);
      for(let j = 0; j < this._height; j++) {
        this._display[j][i] = column[j];
      }
    }

    let output = "";
    for (let i = 0; i < this._height; i++) {
      for (let j = 0; j < this._width; j++) {
        output += this._display[i][j] == 1 ? "X" : " ";
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