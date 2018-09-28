import { CharactersJSONSchema } from "./types";
import { Character } from "./character";
import { BitArray, bit } from "./bit-array";
import { NearestNeighbor } from "./character-sizer";

export class CharactersJSON {
    static import(path: string, size: number, success: (content: Character[]) => any) {
        fetch(path)
        .then((response) => {
            return response.text();
        })
        .then((response) => {
            success(CharactersJSON.parse(response, size))
        })
        .catch((error) => {
            throw `Couldn't fetch file: ${path}`;
        });
    }

    static export() {
        // TODO: Implement
    }

    static parse(json: string, size: number): Character[] {
        if (size < 1 || size > 10) {
            throw 'Size should be between 1 and 10';
        }

        const data = JSON.parse(json) as CharactersJSONSchema;

        if (data == null) {
            throw 'Invalid character json file';
        }

        if (data.characters == null) {
            throw 'Invalid character json file: Can\'t find property characters';
        }

        return data.characters.map(x => {
            if (x.patterns == null) {
                throw 'Invalid character json file: Can\'t find property patterns for a character';
            }
            if (x.output == null) {
                throw 'Invalid character json file: Can\'t find property output for a character';
            }
            if (x.width == null) {
                throw 'Invalid character json file: Can\'t find property width for a character';
            }
            const characterRaw = x.output.map(x => x as bit);
            const character = NearestNeighbor.scale(characterRaw, x.width, size);
            return new Character(x.patterns, new BitArray(character), x.width * size) 
        });
    }

    static stringify(characters: Character[]): string {
        if (characters == null || characters.length == 0) {
            return JSON.stringify("");
        }

        return JSON.stringify({
            characters: characters.map(x => {
                return {
                    patterns: x.patterns,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        });
    }
}