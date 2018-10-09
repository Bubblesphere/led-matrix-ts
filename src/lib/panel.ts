import { Board } from './board';
import { Event } from './event';
import { PanelFrame } from './types';
import { Renderer, IRenderer } from './rendering/renderer';

export interface PanelParameters  {
  /** The board for which the panel operates on */
  board: Board,
  /**  */
  renderer: IRenderer,
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
 * It has control over starting, stopping, pausing, resuming, seeking, ticking.
 */
export abstract class Panel {
  protected display: PanelFrame;
  private _index: number;
  private _increment: number;
  private _width: number;
  private _board: Board;

  private _renderer: IRenderer;
  private _reverse: boolean;
  private _shouldUpdate: boolean;
  private _fps: number;
  private _fpsInterval: number
  private _startTime: number
  private _now: number
  private _then: number
  private _elapsed: number;

  /** Triggered for every new frame the panel produces */
  protected readonly onPanelUpdate = new Event<{display: PanelFrame}>();
  /** Triggered when the index reaches the lower or the upperbound */
  protected readonly onReachingBoundary = new Event<void>();

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
    this._index = 0;
    this._increment = params.increment;
    this.display = [];
    this._renderer = params.renderer;
    this._reverse = params.reverse;
  }

  public get index() {
    return this._index;
  }

  /**
   * Sets the width of the panel
   */
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

  /**
   * Returns the width of the panel
   */
  public get width() {
    return this._width;
  }

  /**
   * Sets the number of frames the panel should produce in a second
   */
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

  /**
   * Gets the number of frames the panel produces in a second
   */
  public get fps() {
    return this._fps;
  }

  /**
   * Set the panel's board
   */
  public set board(value: Board) {
    // validation
    if (value == null) {
      throw `Panel's board cannot be set to null`;
    }
    this._board = value;
  }

  /**
   * Gets the panel's board
   */
  public get board() {
    return this._board;
  }

  /**
   * Sets the panel's index incrementation between each frame
   */
  public set increment(value: number) {
    // validation
    if (value == null) {
      throw `Panel's fps cannot be set to nu_rendererl`;
    }
    if (value < 0) {
      throw `Panel's fps cannot be set to a negative number (${value})`;
    }
    this._increment = value;
  }

  /**
   * Gets the panel's index incrementation between each frame
   */
  public get increment() {
    return this._increment;
  }

  /**
   * Sets the panel's renderer
   */
  public set renderer(value: IRenderer) {
    // validation
    if (value == null) {
      throw `Panel's renderer cannot be set to null`;
    }
    this._renderer = value;
  }

  /**
   * Gets the panel's renderer
   */
  public get renderer() {
    return this._renderer;
  }

  /**
   * Sets whether the panel should increment in reverse
   */
  public set reverse(value: boolean) {
    // validation
    if (value == null) {
      throw `Panel's reverse cannot be set to null`;
    }
    this._reverse = value;
  }

  /**
   * Gets whether the panel should increment in reverse
   */
  public get reverse() {
    return this._reverse;
  }

  /**
   * Starts the panel
   */
  public play() {
    this._index = 0;
    this._draw();
    this._startLoop();
  }

  /**
   * Stops the panel
   */
  public stop() {
    this._index = 0;
    this._draw();
    this._shouldUpdate = false;
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
    this._shouldUpdate = false;
  }

  /**
   * Seeks the panel
   * @param frame The frame to seek to
   */
  public seek(frame: number) {
    if (frame == null || frame < 0 || frame > this.indexUpperBound) {
      throw `Seek expects a value between 0 and ${this.indexUpperBound}`;
    }
    this._index = frame;
    this._draw();
  }

  /**
   * Ticks the panel a single step
   */
  public tick() {
    this._step();
  }

  /**
   * Moves the panel a single step
   */
  private _step(): void {
    this._tickIndex();
    this._draw();
  }

  /**
   * Displays the panel for an index
   */
  private _draw() {
    this._resetPanel();
    this._generateDisplay(this._index);
    this.onPanelUpdate.trigger({ display: this.display });
    this._renderer.render(this.display);
  }

  /**
   * Changes the index to its next value
   */
  private _tickIndex() {
    this._reverse ? this._decrementIndex() : this._incrementIndex();
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

  /**
   * The maximum index the panel can have before looping back
   */
  public abstract get indexUpperBound(): number

  /**
   * Increments the panel next index
   */
  private _incrementIndex() {
    if (this._index >= this.indexUpperBound) {
      this.onReachingBoundary.trigger();
      this._index = 0;
    } else {
      this._index += this._increment;
    }
  }

  /**
   * Decrements the panel next index
   */
  private _decrementIndex() {
    if (this._index === 0) {
      this.onReachingBoundary.trigger();
      this._index = this.indexUpperBound;
    } else {
      this._index -= this._increment;
    }
  }

  /**
   * Starts the looping process
   */
  private _startLoop() {
    this._then = Date.now();
    this._startTime = this._then;
    this._shouldUpdate = true;
    this._loop();
  }

  /**
   * Steps at an interval of the panel's fps
   */
  private _loop(): void {
    requestAnimationFrame(this._loop.bind(this));
    if (this._shouldUpdate) {
      this._onNextFrame(this._step.bind(this));
    }
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