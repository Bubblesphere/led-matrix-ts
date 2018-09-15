import { AlphabetJSONSchema } from "./types";
import Character from "./character";
import BitArray, { bit } from "./bit-array";

export default class AlphabetJSON {
    static import(path: string, success: (content: Character[]) => any) {
        const file = new XMLHttpRequest();
        file.open("GET", "test.json", false);
        file.onreadystatechange = () =>
        {
            if(file.readyState === 4) {
                if(file.status === 200 || file.status == 0) {
                    success(AlphabetJSON.parse(file.responseText));
                }
            }
            // TODO: Error management
        }
        file.send(null);
    }

    static export() {
        // TODO: Implement
    }

    static parse(json: string): Character[] {
        // TODO: Validation
        const data = JSON.parse(json) as AlphabetJSONSchema;
        return data.characters.map(x => new Character(x.patterns, new BitArray(x.output.map(x => x as bit)), x.width))
    }

    static stringify(characters: Character[]): string {
        // TODO: Validation
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