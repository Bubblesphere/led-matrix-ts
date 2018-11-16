import { Character } from './character';
import { bit, BitArray } from './bit-array';
import { Padding, DetailedPadding } from './types';
import { CharacterDictionary } from './character-dictionary';
import { NearestNeighbor } from "./character-sizer";

export interface BoardParameters {
  letterSpacing: number
  padding: Padding,
  size: number
}

/**
 * The board creates the link between the dictionnary and the input. 
 * It's role is to create the matrix reprentation of the entire board
 */
export class Board {
  private _characters: Array<Character>;
  private _letterSpacing: number;
  private _padding: DetailedPadding;
  private _input: string;
  private _size: number;

  /**
   * Creates a board
   * @param spacing The spacing between characters
   */
  constructor(params: BoardParameters) {
    this._characters = [];
    this._letterSpacing = params.letterSpacing;
    this.padding = params.padding;
    this._size = params.size;
  }

  /**
   * Sets the spacing between characters on the board
   */
  public set letterSpacing(value: number) {
    // validation
    if (value == null) {
      throw `Board's spacing cannot be set to null`;
    }
    if (value < 0) {
      throw `Board's spacing cannot be set to a negative number (${value})`;
    }

    this._letterSpacing = value;
  }

  /**
   * Returns the spacing of the board
   */
  public get letterSpacing() {
    return this._letterSpacing;
  }

  /**
   * Returns the characters used by the board
   */
  public get characters() {
    return this._characters
  }

  /**
   * Returns the input of the board
   */
  public get input() {
    return this._input;
  }

  public get size() {
    return this._size;
  }

  /**
   * Sets the spacing around the board
   */
  public set padding(value: Padding) {
    // validation
    value.forEach(x => {
      if (x == null) {
        throw `Board's padding cannot set to null`;
      }

      if (x < 0) {
        throw `Board's padding cannot be set to a negative number (${value})`;
      }
    });

    // convert from 1,2 or 4 value number array to a 4 value number array
    if (value.length == 1) {
      this._padding = [value[0], value[0], value[0], value[0]];
    } else if (value.length == 2) {
      this._padding = [value[0], value[1], value[0], value[1]];
    } else {
      this._padding = value;
    }
  }

  /**
   * Returns the padding of the board
   */
  public get padding() {
    return this._padding;
  }

  /**
   * Returns the total width of the board
   */
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

  /**
   * Return the total height of the board
   */
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
        toReturn =  this._createBitOffArrayOfLength(this._padding[0])
          .concat(characterColumn)
          .concat(this._createBitOffArrayOfLength(this._padding[2]))
          // Character might be shorter than the tallest character
          // If so, append 0s to make up the difference in size
          .concat(characterColumn.length < this.height ? this._createBitOffArrayOfLength(this.height - characterColumn.length) : []);

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
   * Gets the column of the board at the specified index
   * @param index The index of the column to fetch
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
   * @param dictionnary The dictionnary for which the input is tested against
   */
  public load(input: string, dictionnary: CharacterDictionary, size?: number): void {
    const escapeCharacter = '\\';
    const delimiterWord = {
      start: "(",
      end: ")"
    }
    this._characters = [];
    if (size) {
      this._size = size;
    }
    
    for(let i = 0; i < input.length; i++) {
      let characterBuffer = input[i];

      if (characterBuffer === escapeCharacter) {
        // Check if were at the end of the input
        if (i == input.length - 1) {
          throw `No character escaped at the end of the string input`;
        }
        // Change the characterBuffer to the character which is escaped
        characterBuffer = input[++i];
      } else if (characterBuffer === delimiterWord.start && (i === 0 || input[i-1] !== escapeCharacter)) {
        do {
          // Add characters within brackets to the buffer
          characterBuffer += input[++i];

          // Check if we've reached the end of the input without finding the closing bracket
          if (i == input.length) {
            throw `Could not find the ending delimiter "${delimiterWord.end}" for pattern ${characterBuffer}`;
          }
        } while(input[i] != delimiterWord.end);

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
};