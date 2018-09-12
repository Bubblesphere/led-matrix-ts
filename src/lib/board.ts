import Character from './character';
import CharacterDictionary from './character-dictionary';
import BitArray, { bit } from './bit-array';
import { Padding, DetailedPadding } from './types';

/**
 * The board creates the link between the dictionnary and the input. 
 * It's role is to create the matrix reprentation of the entire board
 */
export default class Board {
  private _characters: Array<Character>;
  private _spacing: number;
  private _padding: DetailedPadding;

  /**
   * Creates a board
   * @param spacing The spacing between characters
   */
  constructor(spacing: number = 2, padding: Padding = [0]) {
    this._spacing = spacing;
    this._characters = [];
    if (padding.length == 1) {
      this._padding = [padding[0], padding[0], padding[0], padding[0]];
    } else if (padding.length == 2) {
      this._padding = [padding[0], padding[1], padding[0], padding[1]];
    } else {
      this._padding = padding;
    }
  }

    /**
   * Returns the total width of all characters on the board
   */
  public get width() {
    return this._totalPaddingWidth() + 
      this._totalSpacingWidth() +
      this._characters
        .map(character => character.width)
        .reduce((accumulator, current) => accumulator + current);
  }

  /**
   * Return the total height of the board
   */
  public get height() {
    return this._totalPaddingHeight() + 
      this._characters
        .reduce((accumulator, current) => current.height > accumulator.height ? current : accumulator).height;
  }

  /**
   * Gets the column of the board at the specified index
   * @param index The index of the column to fetch
   */
  public getColumnAtIndex(index: number): Array<bit> {
    index %= this.width;

    if (index < this._padding[3] || index >= this.width - this._padding[1]) {
      // Column is padding
      return this._emptyArrayOfLength(this.height);
    }

    let accumulator = this._padding[3];
    let toReturn;
    this._characters.some((character) => {
      accumulator += character.width;
      if (accumulator > index) {
        // Column is character
        toReturn =  this._emptyArrayOfLength(this._padding[0])
          .concat(character.getColumn(index - (accumulator - character.width)))
          .concat(this._emptyArrayOfLength(this._padding[2]));
        return true;
      }
      accumulator += this._spacing;
      if (accumulator > index) {
        // Column is space
        toReturn = this._emptyArrayOfLength(this.height);
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
      return this._emptyArrayOfLength(this.width);
    }

    return this._emptyArrayOfLength(this._padding[3])
      .concat([].concat.apply([],this._characters.map(x => x.getRow(index - this._padding[0]).concat(this._emptyArrayOfLength(this._spacing)))))
      .concat(this._emptyArrayOfLength(this._padding[1]))
      
  }

  /**
   * Clears the board
   */
  public reset() {
    this._characters = [];
  }

  /**
   * Loads a new input onto the board
   * @param input The input to load on the board
   * @param dictionnary The dictionnary for which the input is tested against
   */
  public load(input: String, dictionnary: CharacterDictionary): void {
    this.reset();
    
    for(let i = 0; i < input.length; i++) {
      let characterBuffer = input[i];

      if (characterBuffer === "~") {
        if (i == input.length - 1) {
          throw `No character escaped at the end of the string input`;
        }
        characterBuffer = input[++i];
      } else if (characterBuffer === "[" && (i === 0 || input[i-1] !== "~")) {
        do {
          characterBuffer += input[++i];
          if (i == input.length) {
            throw `Could not find the end bracket for pattern ${characterBuffer}. To escape the bracket, use \\`;
          }
        } while(input[i] != "]");
      }

      const character = dictionnary.find(characterBuffer);
      if (character) {
        this._characters.push(character);
      } else {
        throw `Could not find any match for ${characterBuffer} within the provided dictionnary`;
      }
    }
  }

  private _totalPaddingWidth(): number {
    return this._padding[1] + this._padding[3];
  }

  private _totalSpacingWidth(): number {
    // There's a space between each character
    return (this._characters.length - 1) * this._spacing;
  }

  private _totalPaddingHeight(): number {
    return this._padding[0] + this._padding[2];
  }

  private _emptyArrayOfLength(length: number) {
    return Array.apply(null, Array(length)).map(() => 0);
  }
};