import Board from './board';
import { bit } from './bit-array';
import Event from './event';
import { PanelDisplay } from './types';
import Renderer from './rendering/renderer';

export interface PanelParameters {
  /** The board for which the panel operates on */
  board: Board,
  /**  */
  renderer: Renderer,
  /** Increment at each frame */
  increment?: number,
  /** Frames of the panel scrolled per second */
  fps?: number,
  /** The width of the panel in bits displayed */
  width?: number,
  /** The height of the panel in bits displayed */
  height?: number,
  /** Whether the panel animation should be reverse */
  reverse?: boolean
}

/**
 * The panel deals with the displaying logic. 
 * You can see it as a viewport moving through a board. 
 * It has control over starting, stopping, pausing, resuming, seeking.
 */
export default abstract class Panel {
  protected index: number;
  protected increment: number;
  protected width: number;
  protected height: number;
  protected display: PanelDisplay;
  protected board: Board;
  protected renderer: Renderer;
  abstract indexUpperBound: number;
  private reverse: boolean;
  private _fps: number;
  private _interval: number;

  /** Triggered for every bit of every new frame the panel produces */
  protected readonly onPanelUpdateBit = new Event<{x: number, y: number, value: bit}>();
  /** Triggered for every new frame the panel produces */
  protected readonly onPanelUpdate = new Event<{display: PanelDisplay}>();
  /** Triggered when the index reaches the lower or the upperbound */
  protected readonly onReachingBoundary = new Event<void>();

  public get PanelUpdateBit() { return this.onPanelUpdateBit.expose(); }
  public get PanelUpdate() { return this.onPanelUpdate.expose(); }
  public get ReachingBoundary() { return this.onReachingBoundary.expose(); }
  
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
    this.increment = params.increment ? params.increment : 1;
    this.display = [];
    this.renderer = params.renderer;
    this.reverse = params.reverse ? params.reverse : false;
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
    if (frame < 0 || frame > this.indexUpperBound) {
      throw `Seek expects a value between 0 and ${this.indexUpperBound}`;
    }
    this.setIndex(frame);
    this._step();
  }

  /**
   * Moves the panel a single step
   */
  private _step(): void {
    this._resetPanel();
    this._generateDisplay();

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.onPanelUpdateBit.trigger({
          x: i,
          y: j,
          value: this.display[i][j] == 1 ? 1 : 0
        });
      }
    }

    this.onPanelUpdate.trigger({ display: this.display });
    this.renderer.render(this.display);

    this.reverse ? this.decrementIndex() : this.incrementIndex();
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
    if (this.index > this.indexUpperBound - 1) {
      this.onReachingBoundary.trigger();
      this.index = 0;
    } else {
      this.index += this.increment;
    }
  }

  private decrementIndex() {
    if (this.index === 0) {
      this.onReachingBoundary.trigger();
      this.index = this.indexUpperBound;
    } else {
      this.index -= this.increment;
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