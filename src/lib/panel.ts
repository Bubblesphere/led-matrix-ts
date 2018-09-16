import Board from './board';
import { bit } from './bit-array';
import Event from './event';
import { PanelDisplay } from './types';
import Renderer from './rendering/renderer';
import { PanelType } from './panel-builder';

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
  /** Whether the panel animation should be reverse */
  reverse?: boolean
}

export interface ExposedPanelParameters {
    panelType: PanelType
    /**  */
    renderer: Renderer,
    /** Increment at each frame */
    increment?: number,
    /** Frames of the panel scrolled per second */
    fps?: number,
    /** The width of the panel in bits displayed */
    width?: number,
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
  private _loopingRequestAnimationFrame: number;
  private _fps: number;
  private _fpsInterval: number
  private _startTime: number
  private _now: number
  private _then: number
  private _elapsed: number;

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
    this.width =  params.width ? params.width : params.board.width;
    this.fps = params.fps ? params.fps : 24;
    this.board = params.board;
    this.index = 0;
    this.increment = params.increment ? params.increment : 1;
    this.display = [];
    this.renderer = params.renderer;
    this.reverse = params.reverse ? params.reverse : false;
  }

  public set fps(value: number) {
    this._fps = value;
    this._fpsInterval = 1000 / this._fps;
  }

  /**
   * Starts the panel
   */
  public play() {
    this.setIndex(0);
    this._startLoop();
  }

  /**
   * Stops the panel
   */
  public stop() {
    this.setIndex(0);
    this._step();
    cancelAnimationFrame(this._loopingRequestAnimationFrame);
  }

  /**
   * Resumes the panel
   */
  public resume() {
    this._startLoop();
  }

  /**
   * Pauses the panel
   */
  public pause() {
    cancelAnimationFrame(this._loopingRequestAnimationFrame);
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

  private _startLoop() {
    this._then = Date.now();
    this._startTime = this._then;
    this._loop();
  }

  /**
   * Steps at an interval of the panel's fps
   */
  private _loop(): void {
    this._loopingRequestAnimationFrame = requestAnimationFrame(this._loop.bind(this));  
    this._onNextFrame(this._step.bind(this));
  }

  private _onNextFrame(callback: () => any) {
    this._now = Date.now();
    this._elapsed = this._now - this._then;

    // if enough time has elapsed, draw the next frame
    if (this._elapsed > this._fpsInterval) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        this._then = this._now - (this._elapsed % this._fpsInterval);

        // Put your drawing code here
        callback();
    }
  }
};