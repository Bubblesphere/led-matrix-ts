import { Board } from './board';
import { Event } from './event';
import { PanelFrame } from './types';
import { Renderer } from './rendering/renderer';
import { PanelSequencer } from './panel-sequencer';

export interface PanelPlayerParameters  {
  renderer: Renderer,
  fps: number,
  panelSequencer: PanelSequencer
}

export class PanelPlayer {
  private _index: number;
  private _panelSequencer: PanelSequencer;

  private _renderer: Renderer;
  private _fps: number;

  private _shouldUpdate: boolean;
  private _fpsInterval: number;
  private _now: number;
  private _then: number;
  private _elapsed: number;

  protected readonly onPanelUpdate = new Event<{display: PanelFrame}>();
  protected readonly onReachingBoundary = new Event<void>();

  public get PanelUpdate() { return this.onPanelUpdate.expose(); }
  public get ReachingBoundary() { return this.onReachingBoundary.expose(); }
  
  constructor(params: PanelPlayerParameters) {
    this.fps = params.fps;
    this._index = 0;
    this._renderer = params.renderer;
    this._panelSequencer = params.panelSequencer;
  }

  public get panelSequencer() {
    return this._panelSequencer;
  }

  public get index() {
    return this._index;
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

  /**
   * Sets the panel's renderer
   */
  public set renderer(value: Renderer) {
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
    if (frame == null || frame < 0 || frame > this._panelSequencer.cachedSequence.length) {
      throw `Seek expects a value between 0 and ${this._panelSequencer.cachedSequence.length}`;
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
    this._incrementIndex();
    this._draw();
  }

  /**
   * Displays the panel for an index
   */
  private _draw() {
    this.onPanelUpdate.trigger({ display: this._panelSequencer.cachedSequence[this._index] });
    this._renderer.render(this._panelSequencer.cachedSequence[this._index]);
  }

  /**
   * Increments the panel next index
   */
  private _incrementIndex() {
    if (this._index >= this._panelSequencer.cachedSequence.length) {
      this.onReachingBoundary.trigger();
      this._index = 0;
    } else {
      this._index += 1;
    }
  }

  /**
   * Starts the looping process
   */
  private _startLoop() {
    this._then = Date.now();
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