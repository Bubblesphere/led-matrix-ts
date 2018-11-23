import { Board } from './board';
import { Event } from './event';
import { PanelFrame } from './types';
import { Renderer } from './rendering/renderer';
import { Exception } from './exception';

export interface PanelSequencerParameters  {
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
export abstract class PanelSequencer {
  readonly CLASS_NAME = PanelSequencer.name;
  private _currentSequence: PanelFrame[];

  private _increment: number;
  private _width: number;
  private _board: Board;
  private _reverse: boolean;

  constructor(params: PanelSequencerParameters) {
    this._width =  params.width;
    this._board = params.board;
    this._increment = params.increment;
    this._reverse = params.reverse;
    this.renderCurrentSequence();
  }

  protected abstract _generateDisplay(currentIndex: number): PanelFrame

  public abstract get indexUpperBound(): number

  public get currentSequence() {
    return this._currentSequence;
  }
  
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
    this._width = value;
    this.renderCurrentSequence();
  }

  public set board(value: Board) {
    Exception.throwIfNull(value, Exception.getDescriptionForProperty(this.CLASS_NAME, 'board'));
    this._board = value;
    this.renderCurrentSequence();
  }

  public set increment(value: number) {
    const fpsDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'fps');
    Exception.throwIfNull(value, fpsDescription);
    Exception.throwIfNegative(value, fpsDescription);
    this._increment = value;
    this.renderCurrentSequence();
  }

  public set reverse(value: boolean) {
    const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
    Exception.throwIfNull(value, reverseDescription);
    this._reverse = value;
    this.renderCurrentSequence();
  }

  public renderCurrentSequence() {
    let sequence = [];

    let panelIndex = 0;
    for (let i = 0; i <= this.indexUpperBound; i++) {
      panelIndex = this._tickPanelIndex(panelIndex);
      sequence.push(this._generateDisplay(panelIndex));
    }

    this._currentSequence = sequence;
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