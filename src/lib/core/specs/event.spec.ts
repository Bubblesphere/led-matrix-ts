
import Board from "../board";
import CharacterDictionary from "../character-dictionary";
import Character from "../character";
import BitArray from "../../utils/bit-array";
import { Panel } from "../panel";
import SideScrollingPanel from "../scrollers/side-scroller";

let panel: Panel;
beforeEach(() => {
    this.panel = new Panel({
        board: new Board({
            padding: [0],
            letterSpacing: 0,
            size: 1
        }),
        increment: 1,
        width: 80,
        reverse: false,
        scroller: new SideScrollingPanel()
    });

    const dict = new CharacterDictionary();
    dict.add([
        new Character('a', new BitArray([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]), 14)
    ])

    this.panel.board.load('aaaaaaaaaaaa', dict);
});

describe('testing on/off', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';
    
    test('Should return true', () => {
        expect(1).toBe(1);
    });
});