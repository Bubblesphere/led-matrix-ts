
import Board from "../board";
import CharacterDictionary from "../character-dictionary";
import Character from "../character";
import BitArray, { bit } from "../../utils/bit-array";
import SideScrollingPanel from "../panels/side-scrolling-panel";
import { Panel } from "../panel";

let panel: Panel;
let board: Board;

beforeEach(() => {
    board = new Board({
        padding: [0],
        letterSpacing: 0,
        size: 1
    });

    const dict = new CharacterDictionary();
    dict.add([
        new Character('a', new BitArray([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]), 14)
    ])

    board.load('aaaaaaaaaaaa', dict);

    panel = new SideScrollingPanel({
        board: board,
        increment: 1,
        width: 80,
        reverse: false
    });
});

describe('testing on/off', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';

});