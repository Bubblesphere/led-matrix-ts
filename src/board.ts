import Character from './character';
import CharacterDictionary from './character-dictionary';
import BitArray, { bit } from './bit-array';

export default class Board {
  private _characters: Array<Character>;
  private _spacing: number;
  private _characterCount: number;

  constructor(spacing: number = 2) {
    this._spacing = spacing;
    this._characters = [];
  }
  
  private _addSpacing(): void {
    this._characters.push(new Character(
      ['[space]'], 
      new BitArray(Array.apply(null, Array(this._spacing)) 
      .map(Number.prototype.valueOf,0)), 
      this._spacing));
  }

  private _getCharacterAtIndex(index: number): number {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].width;
    }
    return --i;
  }

  private _getCharacterOffsetAtIndex(index: number) {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].width;
    }
    return index - (sum - this._characters[--i].width);
  }

  // Returns the total width of all characters on the board
  get width() {
    return this._characters
      .map(character => character.width)
      .reduce((accumulator, current) => accumulator + current);
  }

  getAtIndex(index: number): Array<bit> {
    index %= this.width;
    return this._characters[this._getCharacterAtIndex(index)]
            .getColumn(this._getCharacterOffsetAtIndex(index));
  }

  reset() {
    this._characters = [];
  }

  load(input: String, dictionnary: CharacterDictionary): void {
    this.reset();
    for(let i = 0; i < input.length; i++) {
      const character = dictionnary.find(input[i]);
      if (character) {
        this._characters.push(character);
        this._addSpacing();
      }
    }
  }
};