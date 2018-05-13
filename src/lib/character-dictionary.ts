import Character from './character';
import { IAlphabet } from './types';

export default class CharacterDictionary {
  private _characters: IAlphabet;
  private _output: Array<number>;

  /**
   * Creates a character dictionary
   * @param characters The characters within the dictionary
   */
  constructor(characters: IAlphabet) {
    this._characters = characters;
  }
  
  /**
   * Finds an input within the dictionary
   * @param input The input to seach for
   */
  find(input: string): Character {
    return this._characters.filter(x => x.hasPattern(input))[0];
  } 
};