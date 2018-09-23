import Board from './board';
import { bit } from './bit-array';
import Event from './event';
import { PanelDisplay } from './types';
import Renderer from './rendering/renderer';

export interface PanelParameters  {
  /** The board for which the panel operates on */
  board: Board,
  /**  */
  renderer: Renderer,
  /** Increment at each frame */
  increment: number,
  /** Frames of the panel scrolled per second */
  fps: number,
  /** The width of the panel in bits displayed */
  width: number,
  /** Whether the panel animation should be reverse */
  reverse: boolean
}

/**
 * The panel deals with the displaying logic. 
 * You can see it as a viewport moving through a board. 
 * It has control over starting, stopping, pausing, resuming, seeking.
 */
export default abstract class Panel {
  protected display: PanelDisplay;
  protected nextIndex: number;
  private _increment: number;
  private _width: number;
  private _board: Board;
  private _renderer: Renderer;
  private _reverse: boolean;
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
    this.width =  params.width;
    this.fps = params.fps;
    this._board = params.board;
    this.nextIndex = 0;
    this._increment = params.increment;
    this.display = [];
    this._renderer = params.renderer;
    this._reverse = params.reverse;
  }

  public get index() {
    return this.nextIndex == 0 ? this._board.width : this.nextIndex - 1;
  }

  public set width(value: number) {
    // validation
    if (value == null) {
      throw `Panel's width cannot be set to null`;
    }
    if (value < 0) {
      throw `Panel's width cannot be set to a negative number (${value})`;
    }
    this._width = value;
  }

  public get width() {
    return this._width;
  }

  public set fps(value: number) {
    // validation
    if (value == null) {
      throw `Panel's fps cannot be set to null`;
    }
    if (value < 0) {
      throw `Panel's fps cannot be set to a negative number (${value})`;
    }
    const maxFps = 60;
    if (value > maxFps) {
      throw `Panel's fps has to be lower than ${maxFps}`;
    }
    this._fps = value;
    this._fpsInterval = 1000 / this._fps;
  }

  public get fps() {
    return this._fps;
  }

  public set board(value: Board) {
    // validation
    if (value == null) {
      throw `Panel's board cannot be set to null`;
    }
    this._board = value;
  }

  public get board() {
    return this._board;
  }

  public set increment(value: number) {
    // validation
    if (value == null) {
      throw `Panel's fps cannot be set to null`;
    }
    if (value < 0) {
      throw `Panel's fps cannot be set to a negative number (${value})`;
    }
    this._increment = value;
  }

  public get increment() {
    return this._increment;
  }

  public set renderer(value: Renderer) {
    // validation
    if (value == null) {
      throw `Panel's renderer cannot be set to null`;
    }
    this._renderer = value;
  }

  public get renderer() {
    return this._renderer;
  }

  public set reverse(value: boolean) {
    // validation
    if (value == null) {
      throw `Panel's reverse cannot be set to null`;
    }
    this._reverse = value;
  }

  public get reverse() {
    return this._reverse;
  }

  /**
   * Starts the panel
   */
  public play() {
    this.setNextIndex(0);
    this._startLoop();
  }

  /**
   * Stops the panel
   */
  public stop() {
    this.setNextIndex(0);
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
    if (frame < 0 || frame > this._indexUpperBound()) {
      throw `Seek expects a value between 0 and ${this._indexUpperBound()}`;
    }
    this.setNextIndex(frame);
    this._step();
  }

  /**
   * Moves the panel a single step
   */
  private _step(): void {
    this._resetPanel();
    this._generateDisplay(this.nextIndex);

    for (let i = 0; i < this._board.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.onPanelUpdateBit.trigger({
          x: i,
          y: j,
          value: this.display[i][j] == 1 ? 1 : 0
        });
      }
    }

    this.onPanelUpdate.trigger({ display: this.display });
    this._renderer.render(this.display);

    this._reverse ? this._decrementNextIndex() : this._incrementNextIndex();
  }

  /**
   * Resets the panel to an all 0 panel
   */
  private _resetPanel(): void {
    this.display.splice(0, this.display.length);
    for(let i = 0; i < this._board.height; i++) {
      this.display.push(Array.apply(null, Array(this.width)).map(Number.prototype.valueOf,0));
    }
  }

  /**
   * Generates the displayed matrix
   */
  protected abstract _generateDisplay(currentIndex: number): void

  protected abstract _indexUpperBound(): number

  /**
   * Sets the panel next index
   * @param value The value to set the index at
   */
  protected setNextIndex(value: number) {
    if (value > this._indexUpperBound()) {
      this.nextIndex = 0;
    } else {
      this.nextIndex = value;
    }
  }  

  /**
   * Increments the panel next index
   */
  private _incrementNextIndex() {
    if (this.nextIndex > this._indexUpperBound() - 1) {
      this.onReachingBoundary.trigger();
      this.nextIndex = 0;
    } else {
      this.nextIndex += this._increment;
    }
  }

  private _decrementNextIndex() {
    if (this.nextIndex === 0) {
      this.onReachingBoundary.trigger();
      this.nextIndex = this._indexUpperBound();
    } else {
      this.nextIndex -= this._increment;
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