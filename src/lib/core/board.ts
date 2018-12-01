import { Character } from './character';
import { BitArray, bit } from '../utils/bit-array';
import { Padding, DetailedPadding } from '../types';
import { CharacterDictionary } from './character-dictionary';
import { NearestNeighbor } from "./character-sizer";
import { Event } from '../utils/event';
import { Exception } from '../utils/exception';

export interface BoardParameters {
  letterSpacing: number
  padding: Padding,
  size: number
}

/**
 * The board creates the link between the dictionnary and the input. 
 * Its role is to create the matrix reprentation of the entire board
 */
export class Board {
  readonly CLASS_NAME = Board.name;
  private _characters: Array<Character>;
  private _letterSpacing: number;
  private _padding: DetailedPadding;
  private _input: string;
  private _size: number;

  protected readonly onPropertyChange = new Event<void>();
  public get PropertyChange() { return this.onPropertyChange.expose(); }

  constructor(params: BoardParameters) {
    this._characters = [];
    this._letterSpacing = params.letterSpacing;
    this.padding = params.padding;
    this._size = params.size;
    this.onPropertyChange.trigger();
  }

  /** Returns the spacing between characters on the board */
  public get letterSpacing() {
    return this._letterSpacing;
  }

  /** Returns the padding of the board */
  public get padding() {
    return this._padding;
  }

  /** Returns the characters used by the board */
  public get characters() {
    return this._characters
  }

  /** Returns the input of the board */
  public get input() {
    return this._input;
  }

  /** Returns how many times bigger the character's appear on the board in comparaison to their original size */
  public get size() {
    return this._size;
  }

  /** Returns the total width of the board */
  public get width() {
    const paddingAndSpacingWidth = this._horizontalPaddingWidth() + this._totalSpacingWidth();
    if (this._characters.length > 0) {
      // horizontal padding + space between characters + characters width
      return paddingAndSpacingWidth + this._characters
        .map(character => character.width)
        .reduce((accumulator, current) => accumulator + current);
    } else {
      // horizontal padding + space between characters
      return paddingAndSpacingWidth;
    }

  }

  /** Returns the total height of the board */
  public get height() {
    // vertical padding + size of tallest character
    if (this._characters.length > 0) {
      return this._verticalPaddingWidth() +
        this._characters
          .reduce((accumulator, current) => current.height > accumulator.height ? current : accumulator).height;
    } else {
      return this._verticalPaddingWidth();
    }
  }

  /** Sets the spacing between characters on the board */
  public set letterSpacing(value: number) {
    const letterSpacingDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'padding')
    Exception.throwIfNull(value, letterSpacingDescription);
    Exception.throwIfNegative(value, letterSpacingDescription);
    const prevLetterSpacing = this._letterSpacing;
    this._letterSpacing = value;
    this._emitPropertyChangeEvent(value, prevLetterSpacing);

  }

  /** Sets the spacing around the board */
  public set padding(value: Padding) {
    const paddingDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'padding')
    value.forEach(x => {
      Exception.throwIfNull(x, paddingDescription);
      Exception.throwIfNegative(x, paddingDescription);
    });

    
    const nextPadding = value.length == 1 ?
    [value[0], value[0], value[0], value[0]] :
    value.length == 2 ?
      [value[0], value[1], value[0], value[1]] :
      value;

    if (this._padding) {
      let prevPadding = [...this._padding];
      this._padding = [nextPadding[0], nextPadding[1], nextPadding[2], nextPadding[3]];
      if (this._padding[0] != prevPadding[0] ||
        this._padding[1] != prevPadding[1] ||
        this._padding[2] != prevPadding[2] ||
        this._padding[3] != prevPadding[3]) {
        this.onPropertyChange.trigger();
      }
    } else {
      this._padding = [nextPadding[0], nextPadding[1], nextPadding[2], nextPadding[3]];
      this.onPropertyChange.trigger();
    }

  }

  /**
   * Gets the column of the board at the specified index
   * @param index The index of the column to fetch
   */
  public getColumnAtIndex(index: number): Array<bit> {
    index %= this.width;

    if (index < this._padding[3] || index >= this.width - this._padding[1]) {
      // Column is padding
      return this._createBitOffArrayOfLength(this.height);
    }

    let accumulator = this._padding[3];
    let toReturn;
    this._characters.some((character) => {
      accumulator += character.width;
      if (accumulator > index) {
        // Column is character
        const characterColumn = character.getColumn(index - (accumulator - character.width));
        toReturn = this._createBitOffArrayOfLength(this._padding[0])
          .concat(characterColumn)
          .concat(this._createBitOffArrayOfLength(this._padding[2]))
        
        // Character might be shorter than the tallest character
        // If so, append 0s to make up the difference in size
        if (toReturn.length < this.height) {
          toReturn = toReturn.concat(this._createBitOffArrayOfLength(this.height - characterColumn.length));
        }

        return true;
      }
      accumulator += this._letterSpacing;
      if (accumulator > index) {
        // Column is space
        toReturn = this._createBitOffArrayOfLength(this.height);
        return true;
      }
    });

    return toReturn;
  }

  /**
 * Gets the row of the board at the specified index
 * @param index The index of the row to fetch
 */
  public getRowAtIndex(index: number): Array<bit> {
    index %= this.height;

    if (index < this._padding[0] || index >= this.height - this._padding[2]) {
      // Column is padding
      return this._createBitOffArrayOfLength(this.width);
    }

    // left padding + iterate[ character + space] - space + right padding
    let charactersWithSpace = [].concat.apply([], this._characters.map(x => x.getRow(index - this._padding[0]).concat(this._createBitOffArrayOfLength(this._letterSpacing))));
    charactersWithSpace = charactersWithSpace.slice(0, charactersWithSpace.length - this._letterSpacing);

    return this._createBitOffArrayOfLength(this._padding[3])
      .concat(charactersWithSpace)
      .concat(this._createBitOffArrayOfLength(this._padding[1]));

  }

  /**
   * Loads a new input onto the board
   * @param input The input to load on the board
   * @param dictionnary The dictionnary for which the input details is fetched
   */
  public load(input: string, dictionnary: CharacterDictionary, size: number = 1): void {
    const escapeCharacter = '\\';
    const delimiterWord = {
      start: "(",
      end: ")"
    }
    this._characters = [];
    this._size = size;

    for (let i = 0; i < input.length; i++) {
      let characterBuffer = input[i];

      if (characterBuffer === escapeCharacter) {
        // Check if were at the end of the input
        if (i == input.length - 1) {
          throw `No character escaped at the end of the string input`;
        }
        // Change the characterBuffer to the character which is escaped
        characterBuffer = input[++i];
      } else if (characterBuffer === delimiterWord.start && (i === 0 || input[i - 1] !== escapeCharacter)) {
        do {
          // Add characters within brackets to the buffer
          characterBuffer += input[++i];

          // Check if we've reached the end of the input without finding the closing bracket
          if (i == input.length) {
            throw `Could not find the ending delimiter "${delimiterWord.end}" for pattern ${characterBuffer}`;
          }
        } while (input[i] != delimiterWord.end);

        // Remove delimiter from buffer
        characterBuffer = characterBuffer.slice(1, -1);
      }
      const character = dictionnary.find(characterBuffer);
      this._characters.push(new Character(
        character.pattern,
        new BitArray(NearestNeighbor.scale(character.output.atIndexRange(0, character.output.size), character.width, this._size)),
        character.width * this._size
      ));
    }
    this._input = input;

    this.onPropertyChange.trigger();
  }

  private _horizontalPaddingWidth(): number {
    return this._padding[1] + this._padding[3];
  }

  private _totalSpacingWidth(): number {
    // There's a space between each character
    return (this._characters.length - 1) * this._letterSpacing;
  }

  private _verticalPaddingWidth(): number {
    return this._padding[0] + this._padding[2];
  }

  private _createBitOffArrayOfLength(length: number) {
    return Array.apply(null, Array(length)).map(() => 0);
  }

  private _emitPropertyChangeEvent<T>(value: T, prevValue: T) {
    if (value != prevValue) {
      this.onPropertyChange.trigger();
    }
  }
};