import Character from './character';
import CharacterDictionary from './character-dictionary';
import BitArray, { bit } from './bit-array';

/**
 * The board creates the link between the dictionnary and the input. 
 * It's role is to create the matrix reprentation of the entire board
 */
export default class Board {
  private _characters: Array<Character>;
  private _spacing: number;

  /**
   * Creates a board
   * @param spacing The spacing between characters
   */
  constructor(spacing: number = 2) {
    this._spacing = spacing;
    this._characters = [];
  }

    /**
   * Returns the total width of all characters on the board
   */
  public get width() {
    return this._characters
      .map(character => character.width)
      .reduce((accumulator, current) => accumulator + current);
  }

  /**
   * Return the total height of the board
   */
  public get height() {
    return this._characters
      .reduce((accumulator, current) => current.height > accumulator.height ? current : accumulator).height;
  }

  /**
   * Gets the column of the board at the specified index
   * @param index The index of the column to fetch
   */
  public getColumnAtIndex(index: number): Array<bit> {
    index %= this.width;
    return this._characters[this._getCharacterAtColumnIndex(index)]
            .getColumn(this._getCharacterOffsetAtColumnIndex(index));
  }

    /**
   * Gets the column of the board at the specified index
   * @param index The index of the column to fetch
   */
  public getRowAtIndex(index: number): Array<bit> {
    index %= this.height;
    return [].concat.apply([], this._characters.map(x => x.getRow(index)));
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
      const character = dictionnary.find(input[i]);
      if (character) {
        this._characters.push(character);
        this._addSpacing();
      } else {
        throw `Could not find any match for ${input[i]} within the provided dictionnary`;
      }
    }
  }
  
  private _addSpacing(): void {
    // TODO: change 8 to height
    this._characters.push(new Character(
      ['[space]'], 
      new BitArray(Array.apply(null, Array(8 * this._spacing)).map(Number.prototype.valueOf,0)), 
      this._spacing));
  }

  /**
   * Gets the character at a column index
   * @param index The column index
   */
  private _getCharacterAtColumnIndex(index: number): number {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].width;
    }
    return --i;
  }

  /**
   * Gets the index within the character for a column index
   * @param index The column index
   */
  private _getCharacterOffsetAtColumnIndex(index: number) {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].width;
    }
    return index - (sum - this._characters[--i].width);
  }
};