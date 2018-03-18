import Board from './board';

type PlayParameters = {
  board: Board, 
  callbackTrue?: (x: number, y: number) => any, 
  callbackFalse?: (x: number, y: number) => any,
  callbackDone?: (display: Array<Array<number>>) => any
}

export default class ScrollingMatrix {
  private _index: number;
  private _width: number;
  private _height: number;
  private _display: Array<Array<number>>;
  private _speedBuffer: number;
  private _speed: number;
  
  constructor(speed: number = 100, width: number = 24, height: number = 8) {
    this._index = 0;
    this._width = 60;
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
  
  private _generateDisplay(board: Board): void {
    for(let i = 0; i < this._width; i++) {
      let column;
      if (this._index + i >= board.boardLength()) {
        column = board.getAtIndex((this._index + i) % board.boardLength());
      } else {
        column = board.getAtIndex(this._index + i);
      }
      for(let j = 0; j < this._height; j++) {
        this._display[j][i] = column[j];
      }
    }
  }

  play(params: PlayParameters): void {
    if (this._index > params.board.boardLength()) {
      this._index = 0;
    }

    this._generateEmptyDisplay();
    this._generateDisplay(params.board);

    // Only run if a callback method is provided
    if (params.callbackTrue || params.callbackFalse) {
      for (let i = 0; i < this._height; i++) {
        for (let j = 0; j < this._width; j++) {
          if (this._display[i][j] == 1) {
            if (params.callbackTrue) {
              params.callbackTrue(i, j)
            }
          } else {
            if (params.callbackFalse) {
              params.callbackFalse(i, j)
            }
          }
        }
      }
    }

    params.callbackDone(this._display);

    this._index++;
  }

  loop(params: PlayParameters) {
      setInterval(function() {
        this.play({
          board: params.board, 
          callbackTrue: params.callbackTrue, 
          callbackFalse: params.callbackFalse, 
          callbackDone: params.callbackDone
        });
      }.bind(this), this._speed);    
  }
};