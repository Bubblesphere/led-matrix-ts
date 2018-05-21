import Board from './board';
import BitArray, { bit } from './bit-array';
import { PanelRenderer } from './types';

interface PanelEvents {
  /** Triggered for every bit of every new frame the panel produces */
  onPanelUpdateBit?: (x: number, y: number, value: bit) => any,
  /** Triggered for every new frame the panel produces */
  onPanelUpdate?: PanelRenderer
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

/**
 * The panel deals with the displaying logic. 
 * You can see it as a viewport moving through a board. 
 * It has control over starting, stopping, pausing, resuming, seeking.
 */
export default abstract class Panel {
  protected index: number;
  protected width: number;
  protected height: number;
  protected display: Array<Array<bit>>;
  protected board: Board;
  abstract indexUpperBound: number;
  private _fps: number;
  private _interval: number;
  private _events: PanelEvents;
  
  /**
   * Creates a Panel
   * @param params The panel parameters
   */
  constructor(params: PanelParameters) {
    this.width =  params.width ? params.width : 60;
    this.height = params.height ? params.height : 8;
    this._fps = params.fps ? params.fps : 24;
    this.board = params.board;
    this.index = 0;
    this.display = [];
    this._events = {};
  }

  /**
   * Binds callback methods for whenever an event is triggered
   * @param params The events callbacks
   */
  public events(params: PanelEvents) {
    if (params.onPanelUpdateBit)
      this._events.onPanelUpdateBit = params.onPanelUpdateBit;
    if (params.onPanelUpdate)
      this._events.onPanelUpdate = params.onPanelUpdate;
  }

  /**
   * Starts the panel
   */
  public play() {
    this.setIndex(0);
    this._loop();
  }

  /**
   * Stops the panel
   */
  public stop() {
    this.setIndex(0);
    this._step();
    this._clearExistingLoop();
  }

  /**
   * Resumes the panel
   */
  public resume() {
    this._loop();
  }

  /**
   * Pauses the panel
   */
  public pause() {
    this._clearExistingLoop();
  }

  /**
   * Seeks the panel
   * @param frame The frame to seek to
   */
  public seek(frame: number) {
    this.setIndex(frame);
  }

  /**
   * Moves the panel a single step
   */
  private _step(): void {
    this._resetPanel();
    this._generateDisplay();

    this._fireOnPanelUpdateBit();
    this._fireOnPanelUpdate();

    this.incrementIndex();
  }

  /**
   * Resets the panel to an all 0 panel
   */
  private _resetPanel(): void {
    this.display.splice(0, this.display.length);
    for(let i = 0; i < this.height; i++) {
      this.display.push(Array.apply(null, Array(this.width)).map(Number.prototype.valueOf,0));
    }
  }

  /**
   * Generates the displayed matrix
   */
  protected abstract _generateDisplay(): void

  /**
   * Increments the panel index
   */
  private incrementIndex() {
    if (this.index > this.indexUpperBound) {
      this.index = 0;
    } else {
      this.index++;
    }
    
  }

  /**
   * Sets the panel index
   * @param value The value to set the index at
   */
  protected setIndex(value: number) {
    if (value > this.indexUpperBound) {
      this.index = 0;
    } else {
      this.index = value;
    }
  }

  /**
   * Handles the firing of OnPanelUpdateBit
   */
  private _fireOnPanelUpdateBit() {
    // Only run if a callback method is provided
    if (this._events.onPanelUpdateBit) {
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < this.width; j++) {
          this._events.onPanelUpdateBit(i, j, this.display[i][j] == 1 ? 1 : 0);
        }
      }
    }
  }

  /**
   * Handles the firing of OnPanelUpdate
   */
  private _fireOnPanelUpdate() {
    if (this._events.onPanelUpdate) {
      this._events.onPanelUpdate(this.display);
    }
  }

  /**
   * Steps at an interval of the panel's fps
   */
  private _loop(): void {
    const intervalRate = Math.floor(1000 / this._fps);
    this._clearExistingLoop();
    this._interval = window.setInterval(function() {
      this._step();
    }.bind(this), intervalRate);    
  }

  /**
   * Removes any existing interval
   */
  private _clearExistingLoop(): void {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }
};