import Character from './character';
import CharacterDictionary from './character-dictionary';

export default class Board {
  private _characters: Array<Character>;
  private _spacing: number;
  private _characterCount: number;

  constructor(spacing: number) {
    this._spacing = spacing;
    this._characters = [];
  }
  
  private _addSpacing(): void {
    this._characters.push(
      new Character(['[space]'], Array.apply(null, Array(this._spacing)).map(Number.prototype.valueOf,0)));
  }

  private _getCharacterAtIndex(index: number): number {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].outputLength();
    }
    return --i;
  }

  private _getCharacterOffsetAtIndex(index: number) {
    let sum = 0;
    let i = 0;
    while (sum <= index) {
      sum += this._characters[i++].outputLength();
    }
    return index - (sum - this._characters[--i].outputLength());
  }

  boardLength(): number {
    return this._characters
      .map(character => character.outputLength())
      .reduce((accumulator, current) => accumulator + current);
  }

  getAtIndex(index: number): Array<number> {
    return this._characters[this._getCharacterAtIndex(index)]
            .getOutputColumn(this._getCharacterOffsetAtIndex(index));
  }

  load(input: String, dictionnary: CharacterDictionary): void {
    for(let i = 0; i < input.length; i = i++) {
      this._characters.push(dictionnary.find(input[i]));
      this._addSpacing();
    }
  }
};