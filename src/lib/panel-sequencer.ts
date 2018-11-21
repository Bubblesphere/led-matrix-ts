import { Board } from './board';
import { Event } from './event';
import { PanelFrame } from './types';
import { Renderer } from './rendering/renderer';

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
  private _index: number;
  private _increment: number;
  private _width: number;
  private _board: Board;
  private _reverse: boolean;
  private _cachedSequence: PanelFrame[];

  constructor(params: PanelSequencerParameters) {
    this.width =  params.width;
    this._board = params.board;
    this._index = 0;
    this._increment = params.increment;
    this._reverse = params.reverse;
    this._cachedSequence = this.generatePanelSequence();
  }

  public get cachedSequence() {
    return this._cachedSequence;
  }
  
  public set width(value: number) {
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

  public set board(value: Board) {
    if (value == null) {
      throw `Panel's board cannot be set to null`;
    }
    this._board = value;
    this._cachedSequence = this.generatePanelSequence();
  }

  public get board() {
    return this._board;
  }

  public set increment(value: number) {
    if (value == null) {
      throw `Panel's fps cannot be set to a null value`;
    }
    if (value < 0) {
      throw `Panel's fps cannot be set to a negative number (${value})`;
    }
    this._increment = value;
    this._cachedSequence = this.generatePanelSequence();
  }

  public get increment() {
    return this._increment;
  }

  public set reverse(value: boolean) {
    if (value == null) {
      throw `Panel's reverse cannot be set to null`;
    }
    this._reverse = value;
    this._cachedSequence = this.generatePanelSequence();
  }

  public get reverse() {
    return this._reverse;
  }

  public generatePanelSequence(): PanelFrame[] {
    let sequence = [];

    this._index = 0;
    for (let i = 0; i <= this.indexUpperBound; i++) {
      sequence.push(this._tick());
    }

    return sequence;
  }

  private _tick(): PanelFrame {
    this._tickIndex();
    return this._generateDisplay(this._index);
  }

  private _tickIndex() {
    this._reverse ? this._decrementIndex() : this._incrementIndex();
  }

  protected abstract _generateDisplay(currentIndex: number): PanelFrame

  public abstract get indexUpperBound(): number

  private _incrementIndex() {
    return this._index >= this.indexUpperBound ? 0 : this._index + this._increment;
  }

  private _decrementIndex() {
    return this._index === 0 ? this.indexUpperBound : this._index - this._increment;
  }
};