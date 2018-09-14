import { Alphabet, AlphabetJSONSchema } from "./types";
import Character from "./character";
import BitArray, { bit } from "./bit-array";

export default class AlphabetJSON {
    static load(path: string, success: (content: string) => any) {
        const file = new XMLHttpRequest();
        file.open("GET", "test.json", false);
        file.onreadystatechange = () =>
        {
            if(file.readyState === 4) {
                if(file.status === 200 || file.status == 0) {
                    success(file.responseText);
                }
            }
            // TODO: Error management
        }
        file.send(null);
    }

    static parse(json: string): Alphabet {
        // TODO: Validation
        const data = JSON.parse(json) as AlphabetJSONSchema;
        
        return {
            height: data.height,
            characters: data.characters.map(x => new Character(x.patterns, new BitArray(x.output.map(x => x as bit)), x.width))
        }
    }

    static stringify(characters: Alphabet): string {
        // TODO: Validation
        return JSON.stringify({
            height: characters.height,
            characters: characters.characters.map(x => {
                return {
                    patterns: x.patterns,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        });
    }
}