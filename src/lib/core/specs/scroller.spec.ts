import { SideScroller } from "../scrollers/side-scroller";
import { VerticalScroller } from "../scrollers/vertical-scroller";
import { Board } from "../board";
import { BitArray } from "../../utils/bit-array";
import { Character } from "../character";
import { CharacterDictionary } from "../character-dictionary";
import { Panel } from "../panel";


let panel: Panel;

beforeEach(() => {
    const dict = new CharacterDictionary();
    dict.add([
        new Character('a', new BitArray([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]), 14)
    ])

    panel = new Panel({
        board: new Board({
            padding: [0],
            letterSpacing: 0,
            size: 1
        }),
        increment: 1,
        reverse: false,
        width: 30,
        scroller: new SideScroller()
    });
    panel.board.load('aaaaaaaaaaaa', dict)
});

describe('testing SideScrollingPanel', () => {
    beforeEach(() => {
        panel.scroller = new SideScroller();
    });

    test('Should return one less than the width of the board as the upper bound index', () => {
        expect(panel.scroller.loopEndIndex(panel)).toBe(panel.board.width - 1);
    });
});


describe('testing VerticalScrollingPanel', () => {
    beforeEach(() => {    
        panel.scroller = new VerticalScroller();
    });

    test('Should return one less than the height of the board as the upper bound index', () => {
        expect(panel.scroller.loopEndIndex(panel)).toBe(panel.board.height - 1);
    });
});