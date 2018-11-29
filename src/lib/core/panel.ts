import { Board } from './board';
import { Sequence } from '../types';
import { Exception } from '../utils/exception';
import { Event } from '../utils/event';
import { Scroller } from './scrollers/scroller';

export interface PanelParameters {
  /** The board for which the panel operates on */
  board: Board,
  /** Increment at each frame */
  increment: number,
  /** The width of the panel in bits displayed */
  width: number,
  /** Whether the panel animation should be reverse */
  reverse: boolean,
  scroller: Scroller
}

/**
 * The panel deals with the displaying logic. 
 * You can see it as a viewport moving through a board. 
 * It has control over starting, stopping, pausing, resuming, seeking, ticking.
 */
export class Panel {
  readonly CLASS_NAME = Panel.name;
  private _initiated: boolean = false;

  private _params: PanelParameters;
  private _latestCurrentSequenceUuid: number = 0;

  constructor(params: PanelParameters) {
    this._params = params;
    this._initiated = true;
    this.updateCurrentSequence();

    this._params.board.PropertyChange.on(() => {
      this.updateCurrentSequence();
    })
  }

  protected readonly onNewSequence = new Event<Sequence>();
  public get NewSequence() { return this.onNewSequence.expose(); }

  public get width() {
    return this._params.width;
  }

  public get board() {
    return this._params.board;
  }

  public get increment() {
    return this._params.increment;
  }

  public get reverse() {
    return this._params.reverse;
  }

  public get scroller() {
    return this._params.scroller;
  }

  public set width(value: number) {
    const widthDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'width');
    Exception.throwIfNull(value, widthDescription);
    Exception.throwIfNegative(value, widthDescription);
    if (this._params.width != value) {
      this._params.width = value;
      this.updateCurrentSequence();
    }
  }

  public set board(value: Board) {
    Exception.throwIfNull(value, Exception.getDescriptionForProperty(this.CLASS_NAME, 'board'));
    if (this._params.board != value) {
      this._params.board = value;
      this.updateCurrentSequence();
    }
  }

  public set increment(value: number) {
    const fpsDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'fps');
    Exception.throwIfNull(value, fpsDescription);
    Exception.throwIfNegative(value, fpsDescription);
    if (this._params.increment != value) {
      this._params.increment = value;
      this.updateCurrentSequence();
    }
  }

  public set reverse(value: boolean) {
    const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
    Exception.throwIfNull(value, reverseDescription);
    if (value != this._params.reverse) {
      this._params.reverse = value;
      this.updateCurrentSequence();
    }
  }

  public set scroller(value: Scroller) {
    const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
    Exception.throwIfNull(value, reverseDescription);
    if (value != this._params.scroller) {
      this._params.scroller = value;
      this.updateCurrentSequence();
    }
  }

  public GetCurrentSequence(): Promise<Sequence> {
    return new Promise((resolve) => {
      let sequence: Sequence = [];

      let panelIndex = 0;
      for (let i = 0; i <= this._params.scroller.loopEndIndex(this) / this.increment; i++) {
        sequence.push(this._params.scroller.generatePanelFrameAtIndex(panelIndex, this));
        panelIndex = this._tickPanelIndex(panelIndex);
      }

      resolve(sequence);
    });
  }

  public updateCurrentSequence() {
    if (this._initiated) {
      this._latestCurrentSequenceUuid += 1;
      const currentUuid = this._latestCurrentSequenceUuid;
      this.GetCurrentSequence().then((sequence) => {
        if (currentUuid == this._latestCurrentSequenceUuid && sequence[0].length > 0) {
          this.onNewSequence.trigger(sequence);
        }
      });
    }
  }

  private _tickPanelIndex(index: number): number {
    return this._params.reverse ? this._decrementIndex(index) : this._incrementIndex(index);
  }

  private _incrementIndex(index: number): number {
    return index >= this._params.scroller.loopEndIndex(this) ? 0 : index + this._params.increment;
  }

  private _decrementIndex(index: number): number {
    return index === 0 ? this._params.scroller.loopEndIndex(this) : index - this._params.increment;
  }
};