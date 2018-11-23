import Character from './character';

/**
 * The dictionary contains different characters which are accessible via the find method
 */
export default class CharacterDictionary {
  private _characters: Character[];

  constructor() {
    this._characters = [];
  }

  /** Returns the different characters in the dictionary */
  public get characters() {
    return this._characters
  }

  /** Returns the height of the tallest character within the dictionary */
  public get height() {
    return Math.max.apply(Math, this._characters.map(x => x.height))
  }

  /** Returns the length of the dictionary */
  public get length() {
    return this._characters.length;
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
   * Adds characters to the dictionary
   * @param pendingCharacters Characters pending to be added to the dictionary
   */
  public add(pendingCharacters: Character[]) {
    // Make sure no pending characters have the same pattern
    const pendingPatterns: string[] = pendingCharacters.map(x => x.pattern);

    const duplicatedPendingPatterns = pendingPatterns.filter((value, index, array) => {
      return array.indexOf(value) != index;
    })

    if (duplicatedPendingPatterns.length > 0) {
      throw `Pattern already used by another pending character`;
    }

    // Make sure no pending characters have the same pattern as already added characters
    if (this._characters.length > 0) {
      const alreadyAddedPatterns: string[] = this._characters.map(x => x.pattern);

      const duplicatedPatterns = alreadyAddedPatterns.filter((value) => {
        return pendingPatterns.indexOf(value) != -1;
      })

      if (duplicatedPatterns.length > 0) {
        throw `Pattern already used by another character`;
      }
    }

    this._characters.push(...pendingCharacters);
  }

  /**
 * Edits a character from the dictionary
 * @param pendingCharacter Character pending to be edited from the dictionary
 */
  public edit(pendingCharacter: Character) {
    let edited = false;
    this._characters.forEach((character, index, arr) => {
      if (character.pattern == pendingCharacter.pattern && !edited) {
        arr[index] = pendingCharacter;
        edited = true;
      }
    });
    if (!edited) {
      throw `Could not find character ${pendingCharacter.pattern} in the alphabet. Aborted edit operation`;
    }
  }

  /**
* Deletes a character from the dictionary
* @param pendingCharacter Character pending to be deleted from the dictionary
*/
  public delete(pendingCharacter: Character) {
    let deleted = false;
    this._characters.forEach((character, index, arr) => {
      if (character.pattern == pendingCharacter.pattern && !deleted) {
        arr.splice(index, 1);
        deleted = true;
      }
    });
    if (!deleted) {
      throw `Could not find character ${pendingCharacter.pattern} in the alphabet. Aborted delete operation`;
    }
  }
};

