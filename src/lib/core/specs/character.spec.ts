import Character from "../character";
import BitArray from "../../utils/bit-array";

describe('testing Character constructor', () => {
    test('Should throw an exception if the output is smaller than the character\'s width', () => {
        expect(() => {
            return new Character('a', new BitArray([0]), 2);
        }).toThrow();
    });

    test('Should throw an exception if the output isn\'t divisible by the character\'s width', () => {
        expect(() => {
            return new Character('a', new BitArray([0, 0, 0]), 2);
        }).toThrow();
    });
});

describe('testing getColumn', () => {
    let character: Character;

    beforeEach(() => {
        character = new Character('a', new BitArray([1, 0, 0, 1]), 2);
    });

    test('Should throw an exception if the index is negative', () => {
        expect(() => {
            character.getColumn(-1);
        }).toThrow();
    });

    test('Should throw an exception if the index is greater than the width', () => {
        expect(() => {
           character.getColumn(2);
        }).toThrow();
    });

    test('Should return valid columns for a character', () => {
        expect(character.getColumn(0)).toEqual([1, 0]);
        expect(character.getColumn(1)).toEqual([0, 1]);
    });
});

describe('testing getRow', () => {
    let character: Character;

    beforeEach(() => {
        character = new Character('a', new BitArray([1, 0, 0, 1]), 2);
    });

    test('Should throw an exception if the index is negative', () => {
        expect(() => {
            character.getRow(-1);
        }).toThrow();
    });

    test('Should throw an exception if the index is greater than the height', () => {
        expect(() => {
           character.getRow(2);
        }).toThrow();
    });

    test('Should return valid rows for a character', () => {
        expect(character.getRow(0)).toEqual([1, 0]);
        expect(character.getRow(1)).toEqual([0, 1]);
    });
});

describe('testing properties', () => {
    let character: Character;

    beforeEach(() => {
        character = new Character('a', new BitArray([1, 0, 0, 1]), 2);
    });

    test('Should return the correct width', () => {
        expect(character.width).toBe(2);
    });

    test('Should return the correct height', () => {
        expect(character.height).toBe(2);
    });

    test('Should return the correct patterns', () => {
        expect(character.pattern).toEqual(['a']);
    });

    test('Should return the correct output', () => {
        expect(character.output).toEqual(new BitArray([1, 0, 0, 1]));
    });
});

describe('testing hasPattern', () => {
    test('Should return false if the character doesn\'t have the pattern', () => {
        const character = new Character('a', new BitArray([1, 0, 0, 1]), 2);
        expect(character.hasPattern('b')).toBeFalsy();
    });
    test('Should return true if the character has the pattern', () => {
        const character = new Character('a', new BitArray([1, 0, 0, 1]), 2);
        expect(character.hasPattern('a')).toBeTruthy();
    });
});