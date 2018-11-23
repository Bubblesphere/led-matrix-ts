
import { PanelFrame, Sequence } from "../types";
import { Event, IEvent } from "../utils/event";
import { Renderer } from "./rendering/renderer";
import { PanelPlayer } from "./panel-player";
import { RendererBuilder, RendererType } from "./rendering/renderer-builder";

interface SetRendererBuilderParameters {
  rendererType: RendererType,
  elementId: string
}

interface RendererBuilderParameters {
  rendererType?: RendererType,
  elementId?: string
}

interface ExposedPlayerParameters {
  renderer?: Renderer | RendererBuilderParameters,
  fps?: number
}

export type LedMatrixWebPlayerParameters =
  ExposedPlayerParameters &
  RendererBuilderParameters;


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

  public setRendererFromBuilder(value: SetRendererBuilderParameters) {
    this._panelPlayer.renderer = RendererBuilder.build(value.rendererType, value.elementId);
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
      rendererType: RendererType.ASCII,
      elementId: 'led-matrix',
    }

    if (params) {
      params.fps = this._valueOrDefault(params.fps, defaultParams.fps);
      params.renderer = this._valueOrDefault(params.renderer, defaultParams.renderer);

      if (params.renderer instanceof Renderer) {
        params.renderer = params.renderer;
      } else {
        params.renderer = RendererBuilder.build(this._valueOrDefault(params.renderer.rendererType, defaultParams.rendererType), this._valueOrDefault(params.elementId, defaultParams.elementId));
      }

      return params;
    }

    defaultParams.renderer = RendererBuilder.build(defaultParams.rendererType, defaultParams.elementId);
    return defaultParams;
  }

  private _valueOrDefault<T>(value: T, defaultValue: T) {
    return value ? value : defaultValue;
  }
}