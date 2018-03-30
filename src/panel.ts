import Board from './board';
import BitArray, { bit } from './bit-array';

type Events = {
  onPanelUpdateBit?: (x: number, y: number, value: bit) => any,
  onPanelUpdate?: (display: Array<Array<number>>) => any
}

export default class panel {
  private _index: number;
  private _width: number;
  private _height: number;
  private _display: Array<Array<number>>;
  private _speedBuffer: number;
  private _speed: number;
  private _interval: number;
  private _board: Board;
  private _events: Events;
  
  constructor(board: Board, speed: number = 60, width: number = 256, height: number = 8) {
    this._index = 0;
    this._width = width;
    this._height = height;
    this._display = [];
    this._speed = speed;
    this._board = board;
    this._events = {};
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
    if (this._index > this._board.width) {
      this._index = 0;
    }

    this._generateEmptyDisplay();
    this._generateDisplay(this._board);

    // Only run if a callback method is provided
    if (this._events.onPanelUpdateBit) {
      for (let i = 0; i < this._height; i++) {
        for (let j = 0; j < this._width; j++) {
          this._events.onPanelUpdateBit(i, j, this._display[i][j] == 1 ? 1 : 0);
        }
      }
    }

    if (this._events.onPanelUpdate) {
      this._events.onPanelUpdate(this._display);
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

  events(params: Events) {
    if (params.onPanelUpdateBit)
      this._events.onPanelUpdateBit = params.onPanelUpdateBit;
    if (params.onPanelUpdate)
      this._events.onPanelUpdate = params.onPanelUpdate;
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