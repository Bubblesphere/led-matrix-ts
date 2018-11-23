import { Event } from './event';
import { PanelFrame } from './types';
import { Renderer } from './rendering/renderer';
import { PanelSequencer } from './panel-sequencer';
import { Exception } from './exception';

export interface PanelPlayerParameters  {
  renderer: Renderer,
  fps: number,
  panelSequencer: PanelSequencer
}

export class PanelPlayer {
  readonly CLASS_NAME = PanelSequencer.name;
  private _index: number;
  private _panelSequencer: PanelSequencer;

  private _renderer: Renderer;
  private _fps: number;

  private _shouldUpdate: boolean;
  private _fpsIntervalLengthInMs: number;
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

  /** Gets the panel player's sequencer */
  public get panelSequencer() {
    return this._panelSequencer;
  }

  /** Gets the panel player's index */
  public get index() {
    return this._index;
  }

  /** Gets the panel player's fps */
  public get fps() {
    return this._fps;
  }

  /** Gets the panel player's renderer */
  public get renderer() {
    return this._renderer;
  }

  /** Sets the panel's fps */
  public set fps(value: number) {
    const fpsDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'fps');
    Exception.throwIfNull(value, fpsDescription);
    Exception.throwIfNotBetween(value, fpsDescription, 0, 60);
    this._fps = value;
    this._fpsIntervalLengthInMs = 1000 / this._fps;
  }

  /** Sets the panel player's renderer */
  public set renderer(value: Renderer) {
    Exception.throwIfNull(value, Exception.getDescriptionForProperty(this.CLASS_NAME, 'renderer'))
    this._renderer = value;
    this._render();
  }

  /** Starts the panel player */
  public play() {
    this._index = 0;
    this._render();
    this._startLoop();
  }

  /** Stops the panel player */
  public stop() {
    this._index = 0;
    this._render();
    this._shouldUpdate = false;
  }

  /** Resumes the panel player */
  public resume() {
    this._startLoop();
  }

  /** Pauses the panel player */
  public pause() {
    this._shouldUpdate = false;
  }

  /**
   * Seeks the panel player
   * @param frame The frame to seek to
   */
  public seek(frame: number) {
    const seekDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'seek');
    Exception.throwIfNull(frame, seekDescription);
    Exception.throwIfNotBetween(frame, seekDescription, 0, this._panelSequencer.currentSequence.length);
    this._index = frame;
    this._render();
  }

  /* Moves the panel a single step */
  private _nextPanelFrame(): void {
    this._incrementIndex();
    this._render();
  }

  /* Renders the panel's current frame using the renderer */
  private _render() {
    this.onPanelUpdate.trigger({ display: this._panelSequencer.currentSequence[this._index] });
    this._renderer.render(this._panelSequencer.currentSequence[this._index]);
  }

  /* Increments the panel next index */
  private _incrementIndex() {
    const reachedBoundary = this._index >= this._panelSequencer.currentSequence.length;

    if (reachedBoundary) {
      this.onReachingBoundary.trigger();
    }

    this._index = (this._index + 1) % this._panelSequencer.currentSequence.length;
  }

  /* Starts the looping process */
  private _startLoop() {
    this._then = Date.now();
    this._shouldUpdate = true;
    this._loop();
  }

  /* Steps at an interval of the panel's fps */
  private _loop(): void {
    requestAnimationFrame(this._loop.bind(this));
    if (this._shouldUpdate) {
      this._callIfReadyForNextFrame(this._nextPanelFrame.bind(this));
    }
  }

  /* Calls the callback if ready next frame (fps based) */
  private _callIfReadyForNextFrame(callback: () => any) {
    this._now = Date.now();
    this._elapsed = this._now - this._then;

    // if enough time has elapsed, draw the next frame
    if (this._elapsed > this._fpsIntervalLengthInMs) {

        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        this._then = this._now - (this._elapsed % this._fpsIntervalLengthInMs);

        // Put your drawing code here
        callback();
    }
  }
};