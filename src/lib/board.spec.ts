import Board from './board';
import Alphabet from './alphabet';
import Character from './character';
import BitArray, { bit } from './bit-array';

let board: Board;


beforeEach(() => {
    board = new Board({
        spacing: 0,
        padding: [0]
    });
})

describe('testing spacing', () => {
    test('Should throw an error when setting a null spacing', () => {
        expect(() => { 
            board.spacing = null
        }).toThrow();
    });

    test('Should throw an error when setting a negative spacing', () => {
        expect(() => { 
            board.spacing = -1;
        }).toThrow();
    });

    test('Should set spacing when it\'s a positive number', () => {
        board.spacing = 1;
        expect(board.spacing).toBe(1);
    });
});

describe('testing padding', () => {
    test('Should throw an error when setting a null value within padding', () => {
        expect(() => { 
            board.padding = [null, null, null, null];
        }).toThrow();
    });

    test('Should throw an error when setting a negative padding', () => {
        expect(() => { 
            board.padding = [-1, -1, -1, -1];
        }).toThrow();
    });

    test('Should set padding correctly when inputing a 1 positive number array', () => {
        board.padding = [1];
        expect(board.padding).toEqual([1, 1, 1, 1]);
    });

    test('Should set padding correctly when inputing a 2 positive number array', () => {
        board.padding = [1, 2];
        expect(board.padding).toEqual([1, 2, 1, 2]);
    });

    test('Should set padding correctly when inputing a 4 positive number array', () => {
        board.padding = [1, 2, 3, 4];
        expect(board.padding).toEqual([1, 2, 3, 4]);
    });
});

describe('testing width', () => {
    test('Should add up padding, spacings and characters', () => {
        const paddingLeft = 1;
        const paddingRight = 1;
        const spacing = 1;
        const characterWidth = 1;

        board.padding = [0, paddingRight, 0, paddingLeft];
        board.spacing = spacing;
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([0]), characterWidth),
            new Character(['b'], new BitArray([0]), characterWidth)
        ])
        board.load('ab', alphabet);

        expect(board.width).toBe(paddingLeft + characterWidth + spacing + characterWidth + paddingRight);
    });
});

describe('testing height', () => {
    test('Should add up padding and tallest character', () => {
        const paddingBottom = 1;
        const paddingTop = 1;
        const tallestCharacter = 2;

        board.padding = [paddingTop, 0, paddingBottom, 0];
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([0,0]), 1), // tallest character
            new Character(['b'], new BitArray([0]), 1)
        ])
        board.load('ab', alphabet);
        
        expect(board.height).toBe(paddingBottom + tallestCharacter + paddingTop);
    });
});

describe('testing getColumnAtIndex', () => {
    test('Should return an array of 0 the size of height when column is padding', () => {
        const paddingLeft = 1;
        const paddingRight = 1;

        board.padding = [0, paddingRight, 0, paddingLeft];
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([1, 1]), 1)
        ])
        board.load('a', alphabet);
        
        expect(board.getColumnAtIndex(0)).toEqual([0, 0]);
        expect(board.getColumnAtIndex(2)).toEqual([0, 0]);
    });

    test('Should return an array of 0 the size of height when column is spacing', () => {
        board.spacing = 1;
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([1, 1]), 1)
        ])
        board.load('aa', alphabet);
        
        expect(board.getColumnAtIndex(1)).toEqual([0, 0]);
    });

    test('Should return an array of bit corresponding to the character when column is a character', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([1, 1, 0]), 1)
        ])
        board.load('aa', alphabet);
        
        expect(board.getColumnAtIndex(0)).toEqual([1, 1, 0]);
    });
});

describe('testing getRowAtIndex', () => {
    test('Should return an array of 0 the size of width when row is padding', () => {
        const paddingTop = 1;
        const paddingBottom = 1;

        board.padding = [paddingTop, 0, paddingBottom, 0];
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([1, 1]), 2)
        ])
        board.load('a', alphabet);
        
        expect(board.getRowAtIndex(0)).toEqual([0, 0]);
        expect(board.getRowAtIndex(2)).toEqual([0, 0]);
    });

    test('Should return left padding + iterate[character + space] - space + right padding when row isn\'t padding', () => {
        const paddingLeft = 1;
        const paddingRight = 1;
        const spacing = 1;
        const character = [1, 1] as bit[];

        board.padding = [0, paddingRight, 0 , paddingLeft];
        board.spacing = spacing;
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray(character), character.length)
        ])
        board.load('aa', alphabet);

        expect(board.getRowAtIndex(0)).toEqual([0, 1, 1, 0, 1, 1, 0]);
    });
});

describe('testing load', () => {
    test('Should throw an error if there\'s no ending bracket in a multicharacter input', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([0]), 1),
            new Character(['[long]'], new BitArray([0]), 1)
        ])

        expect(() => {
            board.load('[long', alphabet);
        }).toThrow();

        expect(() => {
            board.load('a[long', alphabet);
        }).toThrow();
    });

    test('Should be able to retrieve multicharacter pattern character', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['[long]'], new BitArray([0]), 1)
        ])

        board.load('[long]', alphabet);
        expect(board.width).toBeGreaterThan(0);
    });

    test('Should be able to retrieve a character', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['a'], new BitArray([0]), 1)
        ])

        board.load('a', alphabet);
        expect(board.width).toBeGreaterThan(0);
    });

    test('Should be able to escape bracket using tilde', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['['], new BitArray([0, 0]), 2),
            new Character(['a'], new BitArray([0, 0]), 2),
            new Character([']'], new BitArray([0, 0]), 2),
            new Character(['[a]'], new BitArray([0]), 1)
        ])

        board.load('~[a]', alphabet);
        expect(board.width).toBe(6);
    });


    test('Should throw an error if the last character is a tilde and it\'s not escaped', () => {
        const alphabet = new Alphabet();
        alphabet.add([
            new Character(['~'], new BitArray([0, 0]), 2),
            new Character(['a'], new BitArray([0, 0]), 2)
        ])

        expect(() => {
            board.load('a~', alphabet);
        }).toThrow();
    });
});