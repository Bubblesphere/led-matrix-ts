import Board from './board';

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