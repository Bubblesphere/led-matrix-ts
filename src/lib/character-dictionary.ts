import { Character } from './character';

/**
 * The dictionary contains different characters which are accessible via the find method
 */
export class CharacterDictionary {
  private _characters: Character[];

  constructor() {
    this._characters = [];
  }

  /**
   * Finds an input within the dictionary 
   * @param input The input corresponding
   */
  public find(input: string): Character {
    const character = this._characters.filter(x => x.hasPattern(input));
    if (character && character.length > 0) {
      return character[0];
    }
    throw `Could not find character ${input} in the alphabet`;
  }

  /**
   * Returns the height of the tallest character within the dictionary
   */
  public get height() {
    return Math.max.apply(Math, this._characters.map(x => x.height))
  }

  /**
   * Returns the length of the dictionary
   */
  public get length() {
    return this._characters.length;
  }

  /**
   * Adds characters to the dictionary
   * @param pendingCharacters Characters pending to be added to the dictionary
   */
  public add(pendingCharacters: Character[]) {
    // Make sure no pending characters have the same pattern
    const pendingPatterns: string[] = [].concat.apply([], pendingCharacters.map(x => x.patterns));

    const duplicatedPendingPatterns = pendingPatterns.filter((value, index, array) => {
      return array.indexOf(value) != index;
    })

    if (duplicatedPendingPatterns.length > 0) {
      throw `Different characters cannot have the same patterns. Some of the characters pending to be added have the same patterns. The following patterns were identified as duplicates: ${duplicatedPendingPatterns.join(", ")}`;
    }

    // Make sure no pending characters have the same pattern as already added characters
    if (this._characters.length > 0) {
      const alreadyAddedPatterns: string[] = [].concat.apply([], this._characters.map(x => x.patterns));

      const duplicatedPatterns = alreadyAddedPatterns.filter((value) => {
        return pendingPatterns.indexOf(value) != -1;
      })
  
      if (duplicatedPatterns.length > 0) {
        throw `Different characters cannot have the same patterns. One or more of the characters pending to be added has the same pattern as one or more already added characters. The following patterns were identified as duplicates: ${duplicatedPatterns.join(", ")}`;
      }
    }

    this._characters.push(...pendingCharacters);
  }
};

