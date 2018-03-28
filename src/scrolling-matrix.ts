import Board from './board';
import BitArray, { bit } from './bit-array';

type StepParameters = {
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
  private _interval: number;
  private _stepParameters: StepParameters;
  
  constructor(board: Board, speed: number = 60, width: number = 256, height: number = 8) {
    this._index = 0;
    this._width = width;
    this._height = height;
    this._display = [];
    this._speed = speed;
    this._stepParameters = {board: board};
  }

  private _generateEmptyDisplay(): void {
    this._display.splice(0, this._display.length);
    for(let i = 0; i < this._height; i++) {
      this._display.push(Array.apply(null, Array(this._width)).map(Number.prototype.valueOf,0));
    }
  }
  
  private _generateDisplay(board: Board): void {
    for(let i = 0; i < this._width; i++) {
      let column: Array<bit>;
      column = board.getAtIndex(this._index + i);
      
      for(let j = 0; j < this._height; j++) {
        this._display[j][i] = column[j];
      }
    }
  }

  private _step(): void {
    if (this._index > this._stepParameters.board.width) {
      this._index = 0;
    }

    this._generateEmptyDisplay();
    this._generateDisplay(this._stepParameters.board);

    // Only run if a callback method is provided
    if (this._stepParameters.callbackTrue || this._stepParameters.callbackFalse) {
      for (let i = 0; i < this._height; i++) {
        for (let j = 0; j < this._width; j++) {
          if (this._display[i][j] == 1) {
            if (this._stepParameters.callbackTrue) {
              this._stepParameters.callbackTrue(i, j);
            }
          } else {
            if (this._stepParameters.callbackFalse) {
              this._stepParameters.callbackFalse(i, j);
            }
          }
        }
      }
    }

    if (this._stepParameters.callbackDone) {
      this._stepParameters.callbackDone(this._display);
    }

    this._index++;
  }

  private _loop(): void {
    this._clearExistingLoop();
    this._interval = window.setInterval(function() {
      this._step();
    }.bind(this), this._speed);    
  }

  private _clearExistingLoop(): void {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  stepParameters(params: StepParameters) {
    this._stepParameters.board = params.board;
    if (params.callbackTrue)
      this._stepParameters.callbackTrue = params.callbackTrue;
    if (params.callbackFalse)
      this._stepParameters.callbackFalse = params.callbackFalse;
    if (params.callbackDone)
      this._stepParameters.callbackDone = params.callbackDone;
  }

  play() {
    this._index = 0;
    this._loop();
  }

  stop() {
    this._index = 0;
    this._step();
    this._clearExistingLoop();
  }

  resume() {
    this._loop();
  }

  pause() {
    this._clearExistingLoop();
  }
};