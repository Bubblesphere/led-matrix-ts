import Board from './board';
import BitArray from './bit-array';
import { bit } from './types';

interface Events {
  /** Triggered for every bit of every new frame the panel produces */
  onPanelUpdateBit?: (x: number, y: number, value: bit) => any,
  /** Triggered for every new frame the panel produces */
  onPanelUpdate?: (display: Array<Array<bit>>) => any
}

export interface PanelParameters {
  /** The board for which the panel operates on */
  board: Board,
  /** Frames of the panel scrolled per second */
  fps?: number,
  /** The width of the panel in bits displayed */
  width?: number,
  /** The height of the panel in bits displayed */
  height?: number
}

export default class Panel {
  private _index: number;
  private _width: number;
  private _height: number;
  private _display: Array<Array<bit>>;
  private _fps: number;
  private _interval: number;
  private _board: Board;
  private _events: Events;
  
  /**
   * Creates a Panel
   * @param params The panel parameters
   */
  constructor(params: PanelParameters) {
    this._width =  params.width ? params.width : 60;
    this._height = params.height ? params.height : 8;
    this._fps = params.fps ? params.fps : 24;
    this._board = params.board;
    this._index = 0;
    this._display = [];
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
    const intervalRate = Math.floor(1000 / this._fps);
    this._clearExistingLoop();
    this._interval = window.setInterval(function() {
      this._step();
    }.bind(this), intervalRate);    
  }

  private _clearExistingLoop(): void {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  /**
   * Binds callback methods for whenever an event is triggered
   * @param params The events callbacks
   */
  events(params: Events) {
    if (params.onPanelUpdateBit)
      this._events.onPanelUpdateBit = params.onPanelUpdateBit;
    if (params.onPanelUpdate)
      this._events.onPanelUpdate = params.onPanelUpdate;
  }

  /**
   * Starts the panel
   */
  play() {
    this._index = 0;
    this._loop();
  }

  /**
   * Stops the panel
   */
  stop() {
    this._index = 0;
    this._step();
    this._clearExistingLoop();
  }

  /**
   * Resumes the panel
   */
  resume() {
    this._loop();
  }

  /**
   * Pauses the panel
   */
  pause() {
    this._clearExistingLoop();
  }

  /**
   * Seeks the panel
   * @param frame The frame to seek to
   */
  seek(frame: number) {
    this._index = frame;
  }
};