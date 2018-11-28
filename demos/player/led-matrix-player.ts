
import { PanelFrame, Sequence, Event, IEvent } from '../../src/index';
import { Renderer } from "./rendering/renderer";
import { PanelPlayer } from "./panel-player";
import { CanvasRenderers } from "./rendering/canvas-renderers";

interface ExposedPlayerParameters {
  renderer?: Renderer,
  fps?: number
}

export type LedMatrixWebPlayerParameters = ExposedPlayerParameters;

export class LedMatrixPlayer implements LedMatrixWebPlayerParameters {
  private _params: LedMatrixWebPlayerParameters;

  private _panelPlayer: PanelPlayer;

  private readonly onReady = new Event<void>();
  public event: {
    panelUpdate: IEvent<{ display: PanelFrame }>,
    reachingBoundary: IEvent<void>
  };

  constructor(sequence: Sequence, params?: LedMatrixWebPlayerParameters) {
    this._params = this._validateParameters(params);
    this._panelPlayer = new PanelPlayer({
      fps: this._params.fps,
      renderer: this._params.renderer as Renderer,
      sequence: sequence
    });

    this.event = {
      panelUpdate: this._panelPlayer.PanelUpdate,
      reachingBoundary: this._panelPlayer.ReachingBoundary
    };
  }

  public get Ready() { return this.onReady.expose(); }

  public index() {
    this._panelPlayer.index;
  }

  public set renderer(value: Renderer) {
    this._panelPlayer.renderer = value;
  }

  public get renderer() {
    return this._panelPlayer.renderer;
  }

  public set fps(value: number) {
    this._panelPlayer.fps = value;
  }

  public get fps() {
    return this._panelPlayer.fps;
  }

  public set sequence(value: Sequence) {
    this._panelPlayer.sequence = value;
  }

  public get sequence() {
    return this._panelPlayer.sequence;
  }

  public play() {
    this._panelPlayer.play();
  }

  public stop() {
    this._panelPlayer.stop();
  }

  public pause() {
    this._panelPlayer.pause();
  }

  public resume() {
    this._panelPlayer.resume();
  }

  public step() {
    this._panelPlayer.step();
  }

  public seek(frame: number) {
    this._panelPlayer.seek(frame);
  }

  private _validateParameters(params: LedMatrixWebPlayerParameters) {
    let defaultParams: LedMatrixWebPlayerParameters = {
      fps: 30,
      renderer: new CanvasRenderers.Rect({
        elementId: 'led-matrix'
      })
    }

    if (params) {
      params.fps = this._valueOrDefault(params.fps, defaultParams.fps);
      params.renderer = this._valueOrDefault(params.renderer, defaultParams.renderer);

      return params;
    }

    return defaultParams;
  }

  private _valueOrDefault<T>(value: T, defaultValue: T) {
    return value ? value : defaultValue;
  }
}