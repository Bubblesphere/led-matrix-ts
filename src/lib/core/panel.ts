import Board from './board';
import { PanelFrame, Sequence } from '../types';
import { Exception } from '../utils/exception';
import { Event } from '../utils/event';

export interface PanelParameters  {
  /** The board for which the panel operates on */
  board: Board,
  /** Increment at each frame */
  increment: number,
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
  readonly CLASS_NAME = Panel.name;
  private _initiated: boolean = false;

  private _increment: number;
  private _width: number;
  private _board: Board;
  private _reverse: boolean;

  constructor(params: PanelParameters) {
    this._width =  params.width;
    this._board = params.board;
    this._increment = params.increment;
    this._reverse = params.reverse;
    this._initiated = true;
    this.updateCurrentSequence();

    this._board.PropertyChange.on(() => {
      this.updateCurrentSequence();
    })
  }

  protected readonly onNewSequence = new Event<{sequence: Sequence}>();
  public get NewSequence() { return this.onNewSequence.expose(); }

  protected abstract _generatePanelFrameAtIndex(currentIndex: number): PanelFrame

  public abstract get indexUpperBound(): number
  
  public get width() {
    return this._width;
  }

  public get board() {
    return this._board;
  }

  public get increment() {
    return this._increment;
  }

  public get reverse() {
    return this._reverse;
  }
  
  public set width(value: number) {
    const widthDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'width');
    Exception.throwIfNull(value, widthDescription);
    Exception.throwIfNegative(value, widthDescription);
    if (this._width != value) {
      this._width = value;
      this.updateCurrentSequence();
    }
  }

  public set board(value: Board) {
    Exception.throwIfNull(value, Exception.getDescriptionForProperty(this.CLASS_NAME, 'board'));
    if (this.board != value) {
      this._board = value;
      this.updateCurrentSequence(); 
    }
  }

  public set increment(value: number) {
    const fpsDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'fps');
    Exception.throwIfNull(value, fpsDescription);
    Exception.throwIfNegative(value, fpsDescription);
    if (this._increment != value) {
      this._increment = value;
      this.updateCurrentSequence();
    }
  }

  public set reverse(value: boolean) {
    const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
    Exception.throwIfNull(value, reverseDescription);
    if (value != this._reverse) {
      this._reverse = value;
      this.updateCurrentSequence();
    }
  }

  public GetCurrentSequence(): Sequence {
    let sequence: Sequence = [];

    let panelIndex = 0;
    for (let i = 0; i <= this.indexUpperBound; i++) {
      panelIndex = this._tickPanelIndex(panelIndex);
      sequence.push(this._generatePanelFrameAtIndex(panelIndex));
    }

    return sequence;
  }

  public updateCurrentSequence() {
    if (this._initiated) {
      const sequence = this.GetCurrentSequence();
      this.onNewSequence.trigger({ sequence });
    }
  }

  private _tickPanelIndex(index: number): number {
    return this._reverse ? this._decrementIndex(index) : this._incrementIndex(index);
  }

  private _incrementIndex(index: number): number {
    return index >= this.indexUpperBound ? 0 : index + this._increment;
  }

  private _decrementIndex(index: number): number {
    return index === 0 ? this.indexUpperBound : index - this._increment;
  }
};