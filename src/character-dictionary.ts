import Character from './character';

export default class CharacterDictionary {
  private _characters: Array<Character>;
  private _output: Array<number>;

  constructor(characters: Array<Character>) {
    this._characters = characters;
  }
  
  find(input: string): Character {
    return this._characters.filter(x => x.hasPattern(input))[0];
  } 
};