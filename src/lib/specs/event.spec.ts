import Panel from "../panel";
import Renderer from "../rendering/renderer";
import ASCIIRenderer from "../rendering/ascii-renderer";
import Board from "../board";
import CharacterDictionary from "../character-dictionary";
import Character from "../character";
import BitArray, { bit } from "../bit-array";
import SideScrollingPanel from "../panels/side-scrolling-panel";
import { IEvent } from "../event";
import { PanelDisplay } from "../types";

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

describe('testing on/off', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';

    test('Should add event when using on', () => {
        panel.PanelUpdate.on((display) => {
            expect(true).toBeTruthy();
        });
        panel.tick;
    });

    test('Should remove event when using off', () => {
        const handler = () => {
            return expect(false).toBeTruthy();
        }
        panel.PanelUpdate.on(handler);
        panel.PanelUpdate.off(handler);
        panel.tick();
        return expect(true).toBeTruthy();
    });
});