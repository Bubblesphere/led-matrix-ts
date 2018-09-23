import ASCIIRenderer from "../rendering/ascii-renderer";
import SideScrollingPanel from "../panels/side-scrolling-panel";
import VerticalScrollingPanel from "../panels/vertical-scrolling-panel";
import Board from "../board";
import BitArray from "../bit-array";
import Character from "../character";
import CharacterDictionary from "../character-dictionary";
import Renderer from "../rendering/renderer";

/**
 * canva renderer
 * canva renderers
 * character json
 * panel builder
 */

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
});

describe('testing SideScrollingPanel', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';

    let panel: SideScrollingPanel;

    beforeEach(() => {
        panel = new SideScrollingPanel({
            board: board,
            renderer: renderer,
            increment: 1,
            fps: 60,
            width: 80,
            reverse: false
        });
    });

    test('Should return one less than the width of the board as the upper bound index', () => {
        expect(panel.indexUpperBound).toBe(panel.board.width - 1);
    });
});


describe('testing VerticalScrollingPanel', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';

    let panel: VerticalScrollingPanel;

    beforeEach(() => {    
        panel = new VerticalScrollingPanel({
            board: board,
            renderer: renderer,
            increment: 1,
            fps: 60,
            width: 80,
            reverse: false
        });
    });

    test('Should return one less than the height of the board as the upper bound index', () => {
        expect(panel.indexUpperBound).toBe(panel.board.height - 1);
    });
});

