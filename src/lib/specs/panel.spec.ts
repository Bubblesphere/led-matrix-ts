import Panel from "../panel";
import Board from "../board";
import SideScrollingPanel from "../panels/side-scrolling-panel";
import ASCIIRenderer from "../rendering/ascii-renderer";
import Renderer from "../rendering/renderer";
import CharacterDictionary from "../character-dictionary";
import Character from "../character";
import BitArray from "../bit-array";


let panel: Panel;
let renderer: Renderer;
let board: Board;

beforeEach(() => {
    board = new Board({
        padding: [0],
        spacing: 0,
    });

    const dict = new CharacterDictionary();
    dict.add([
        new Character(['a'], new BitArray([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]), 14)
    ])

    board.load('aaaaaaaaaaaa', dict);

    renderer = new ASCIIRenderer({
        characterBitOn: 'X',
        characterBitOff: ' ',
        element: document.getElementById("led-matrix")
    });

    panel = new SideScrollingPanel({
        board: board,
        renderer: renderer,
        increment: 1,
        fps: 60,
        width: 80,
        reverse: false
    });
});

describe('testing width', () => {
    test('Should throw an error when setting a null width', () => {
        expect(() => { 
            panel.width = null;
        }).toThrow();
    });

    test('Should throw an error when setting a negative width', () => {
        expect(() => { 
            panel.width = -1;
        }).toThrow();
    });

    test('Should set width when it\'s a positive number', () => {
        panel.width = 1;
        expect(panel.width).toBe(1);
    });
});

describe('testing fps', () => {
    test('Should throw an error when setting a null fps', () => {
        expect(() => { 
            panel.fps = null;
        }).toThrow();
    });

    test('Should throw an error when setting a negative fps', () => {
        expect(() => { 
            panel.fps = -1;
        }).toThrow();
    });

    test('Should throw an error when setting an fps greater than 60', () => {
        expect(() => { 
            panel.fps = 61;
        }).toThrow();
    });

    test('Should set fps when it\'s a positive number', () => {
        panel.fps = 1;
        expect(panel.fps).toBe(1);
    });
});

describe('testing board', () => {
    test('Should throw an error when setting a null board', () => {
        expect(() => { 
            panel.board = null;
        }).toThrow();
    });

    test('Should set board when it\'s a Board', () => {
        panel.board = board;
        expect(panel.board).toEqual(board);
    });
});

describe('testing increment', () => {
    test('Should throw an error when setting a null increment', () => {
        expect(() => { 
            panel.increment = null;
        }).toThrow();
    });

    test('Should throw an error when setting a negative increment', () => {
        expect(() => { 
            panel.increment = -1;
        }).toThrow();
    });

    test('Should set increment when it\'s a positive number', () => {
        panel.increment = 1;
        expect(panel.increment).toBe(1);
    });
});

describe('testing renderer', () => {
    test('Should throw an error when setting a null renderer', () => {
        expect(() => { 
            panel.renderer = null;
        }).toThrow();
    });

    test('Should set renderer when it\'s a Renderer', () => {
        panel.renderer = renderer;
        expect(panel.renderer).toEqual(renderer);
    });
});

describe('testing reverse', () => {
    test('Should throw an error when setting a null reverse', () => {
        expect(() => { 
            panel.reverse = null;
        }).toThrow();
    });

    test('Should set reverse when it\'s a boolean value', () => {
        panel.reverse = true;
        expect(panel.reverse).toBeTruthy();
    });
});


describe('ui', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>'; 

    describe('testing play', () => {
        test('Should change the index at least once after 200ms', (done) => {
            panel.play();
            setTimeout(() => {
                expect(panel.index).not.toBe(0);
                done();
            }, 200);
        });
    });
    
    describe('testing stop', () => {
        test('Should reset the index back to 0 when stopping', (done) => {
            panel.play();
            setTimeout(() => {
                expect(panel.index).not.toBe(0);
                panel.stop();
                expect(panel.index).toBe(0);
                done();
            }, 200);
        });
    });

    describe('testing pause', () => {
        test('Should pause the index when pausing', (done) => {
            // play
            panel.play();
            setTimeout(() => {
                expect(panel.index).not.toBe(0);
                // pause
                panel.pause();
                const index = panel.index;
                setTimeout(() => {
                    // check if we're still at the same index as 200ms ago
                    expect(panel.index).toBe(index);
                    done();
                }, 200);
            }, 200);
        });
    });

    describe('testing resume', () => {
        test('Should resume the index when resume', (done) => {
            // play
            panel.play();
            panel.pause();
            setTimeout(() => {
                const index = panel.index;
                panel.resume();
                setTimeout(() => {
                    // check if the panel isn't paused
                    expect(panel.index).not.toBe(index);
                    done();
                }, 200);
            }, 200);
        });
    });

    describe('testing seek', () => {
        test('Should seek the index when seeking', () => {
            panel.seek(3);
            expect(panel.index).toBe(3);
        });
    });
});


/*
resume
pause
seek
PanelUpdateBit
PanelUpdate
ReachingBoundary
*/