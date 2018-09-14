import Character from './character';
import { Alphabet } from './types';

/**
 * The character dictionnary contains the matrix representation of the different characters available. 
 * You can create your own character array and pass it to the constructor.
 */
export default class AlphabetSearcher {
  private _characters: Character[];
  private _height: number;
  /**
   * Creates a character dictionary
   * @param characters The characters within the dictionary
   */
  constructor(characters: Alphabet[]) {
    this._characters = [].concat.apply([], characters.map(x => x.characters));
    this._height = Math.max.apply(Math, characters.map(x => x.height));
    
    if (characters.length > 1) {
      const allPatterns: string[] = [].concat.apply([], this._characters.map(x => x.patterns));

      const duplicatedPatterns = allPatterns.filter((value, index, array) => {
        return array.indexOf(value) != index;
      })

      if (duplicatedPatterns.length > 0) {
        throw `Different characters cannot have the same patterns. The following patterns were identified as duplicates: ${duplicatedPatterns.join(", ")}`;
      }

    }
  }
  
  /**
   * Finds an input within the dictionary
   * @param input The input to seach for
   */
  public find(input: string): Character {
    return this._characters.filter(x => x.hasPattern(input))[0];
  } 
};

