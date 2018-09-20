import Character from "./character";
import BitArray from "./bit-array";
import CharacterDictionary from "./character-dictionary";

let dictionary: CharacterDictionary;

beforeEach(() => {
    dictionary = new CharacterDictionary();
});

describe('testing method find', () => {
    test('Should throw an exception when an input isn\'t found', () => {
        expect(() => { dictionary.find('a') }).toThrow();
    });
    
    test('Should return the character corresponding to an input', () => {
        const character = new Character(['a'], new BitArray([0]), 1);
        dictionary.add([character]);
        expect(dictionary.find('a')).toBe(character);
    });
});

describe('testing method add', () => {
    test('Should throw an error when adding two characters with the same pattern', () => {
        expect(() => { 
            dictionary.add([
                new Character(['a'], new BitArray([0]), 1),
                new Character(['a'], new BitArray([0]), 1)
            ]);
        }).toThrow();
    });

    test('Should throw an error when adding a character which has the same pattern as an already added character', () => {
        dictionary.add([ new Character(['a'], new BitArray([0]), 1) ]);
        expect(() => { 
            dictionary.add([
                new Character(['a'], new BitArray([0]), 1)
            ]);
        }).toThrow();
    });

    test('Should be able to add characters', () => {
        dictionary.add([
            new Character(['a'], new BitArray([0]), 1),
            new Character(['b'], new BitArray([0]), 1)
        ]);
        expect(dictionary.length).toBe(2);
    });
});

describe('testing property height', () => {
    test('Should return the height of the tallest character', () => {
        dictionary.add([
            new Character(['a'], new BitArray([0]), 1),
            new Character(['b'], new BitArray([0, 0]), 1),
            new Character(['c'], new BitArray([0, 0, 0]), 1)
        ]);

        expect(dictionary.height).toBe(3);
    });
});

