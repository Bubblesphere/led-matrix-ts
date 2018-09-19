import Alphabet from "./alphabet";
import Character from "./character";
import BitArray from "./bit-array";

let alphabet: Alphabet;

beforeEach(() => {
    alphabet = new Alphabet();
})

describe('testing method find', () => {
    test('Should throw an exception when an input isn\'t found', () => {
        expect(() => { alphabet.find('a') }).toThrow();
    });
    
    test('Should return the character corresponding to an input', () => {
        const character = new Character(['a'], new BitArray([0]), 1);
        alphabet.add([character]);
        expect(alphabet.find('a')).toBe(character);
    });
})

describe('testing method add', () => {
    test('Should throw an error when adding two characters with the same pattern', () => {
        expect(() => { 
            alphabet.add([
                new Character(['a'], new BitArray([0]), 1),
                new Character(['a'], new BitArray([0]), 1)
            ])
        }).toThrow();
    })
});

