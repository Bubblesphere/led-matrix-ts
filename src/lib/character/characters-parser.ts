import { ICharacters, CharactersJSON } from "../types";
import Character from "../character";
import BitArray, { bit } from "../bit-array";

export default class CharactersParser {
    parse(json: string): ICharacters {
        const data = JSON.parse(json) as CharactersJSON;
        
        return {
            height: data.height,
            characters: data.characters.map(x => new Character(x.patterns, new BitArray(x.output.map(x => x as bit)), x.width))
        }
    }

    stringify(characters: ICharacters): string {
        return JSON.stringify({
            height: characters.height,
            characters: characters.characters.map(x => {
                return {
                    patterns: x.patterns,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        })
    }
}