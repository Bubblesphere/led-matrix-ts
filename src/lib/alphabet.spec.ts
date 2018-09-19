import Alphabet from "./alphabet";
import Character from "./character";
import BitArray from "./bit-array";

let alphabet: Alphabet;

beforeEach(() => {
    alphabet = new Alphabet();
});

describe('testing method find', () => {
    test('Should throw an exception when an input isn\'t found', () => {
        expect(() => { alphabet.find('a') }).toThrow();
    });
    
    test('Should return the character corresponding to an input', () => {
        const character = new Character(['a'], new BitArray([0]), 1);
        alphabet.add([character]);
        expect(alphabet.find('a')).toBe(character);
    });
});

describe('testing method add', () => {
    test('Should throw an error when adding two characters with the same pattern', () => {
        expect(() => { 
            alphabet.add([
                new Character(['a'], new BitArray([0]), 1),
                new Character(['a'], new BitArray([0]), 1)
            ]);
        }).toThrow();
    });

    test('Should throw an error when adding a character which has the same pattern as an already added character', () => {
        alphabet.add([ new Character(['a'], new BitArray([0]), 1) ]);
        expect(() => { 
            alphabet.add([
                new Character(['a'], new BitArray([0]), 1)
            ]);
        }).toThrow();
    });

    test('Should be able to add characters', () => {
        alphabet.add([
            new Character(['a'], new BitArray([0]), 1),
            new Character(['b'], new BitArray([0]), 1)
        ]);
        expect(alphabet.length).toBe(2);
    });
});

describe('testing property height', () => {
    test('Should return the height of the tallest character', () => {
        alphabet.add([
            new Character(['a'], new BitArray([0]), 1),
            new Character(['b'], new BitArray([0, 0]), 1),
            new Character(['c'], new BitArray([0, 0, 0]), 1)
        ]);

        expect(alphabet.height).toBe(3);
    });
});

