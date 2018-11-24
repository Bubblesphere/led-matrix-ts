import { CharactersJSONSchema } from "../types";
import { Character } from "./character";
import { BitArray, bit } from "../utils/bit-array";

export class CharactersJSON {
    static import(path: string, success: (content: Character[]) => any) {
        fetch(path)
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            success(CharactersJSON.parse(response))
        })
        .catch((error) => {
            throw `Couldn't fetch file: ${path}`;
        });
    }

    static export() {
        // TODO: Implement
    }

    static parse(json: string): Character[] {
        const data = JSON.parse(json) as CharactersJSONSchema;

        if (data == null) {
            throw 'Invalid character json file';
        }

        if (data.characters == null) {
            throw 'Invalid character json file: Can\'t find property characters';
        }

        return data.characters.map(x => {
            if (x.pattern == null) {
                throw 'Invalid character json file: Can\'t find property patterns for a character';
            }
            if (x.output == null) {
                throw 'Invalid character json file: Can\'t find property output for a character';
            }
            if (x.width == null) {
                throw 'Invalid character json file: Can\'t find property width for a character';
            }
            return new Character(x.pattern, new BitArray(x.output.map(x => x as bit)), x.width) 
        });
    }

    static stringify(characters: Character[]): string {
        if (characters == null || characters.length == 0) {
            return JSON.stringify("");
        }

        return JSON.stringify({
            characters: characters.map(x => {
                return {
                    patterns: x.pattern,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        });
    }
}