import { Board } from "./board";
import { Panel } from "./panel";
import { Padding, Sequence } from "../types";
import { Event, IEvent } from "../utils/event";
import { CharacterDictionary } from "./character-dictionary";
import { Character } from "./character";
import { Scroller } from "./scrollers/scroller";
import { SideScroller } from "./scrollers/side-scroller";

interface ExposedBoardParameters {
    letterSpacing?: number
    padding?: Padding,
    size?: number
}

interface ExposedPanelParameters {
    scroller?: Scroller,
    /** Increment at each frame */
    increment?: number,
    /** The width of the panel in bits displayed */
    panelWidth?: number,
    /** Whether the panel animation should be reverse */
    reverse?: boolean
}

export type LedMatrixParameters =
    ExposedBoardParameters &
    ExposedPanelParameters;


export class LedMatrix implements LedMatrixParameters {
    private _params: LedMatrixParameters;

    private _dictionary: CharacterDictionary;
    private _panel: Panel;
    private _size: number;

    private readonly onReady = new Event<void>();
    public event: {
        newSequence: IEvent<Sequence>,
    };

    constructor(params?: LedMatrixParameters) {
        this._params = this._validateParameters(params);

        this._panel = new Panel({
            board: new Board({
                letterSpacing: this._params.letterSpacing,
                padding: this._params.padding,
                size: this._params.size
            }),
            increment: this._params.increment,
            reverse: this._params.reverse,
            width: this._params.panelWidth,
            scroller: this._params.scroller
        })

        this.event = {
            newSequence: this._panel.NewSequence
        };

        this._dictionary = new CharacterDictionary();
    }

    public get Ready() { return this.onReady.expose(); }

    public get size() {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
        this._panel.board.load(this.input, this._dictionary, this.size);
    }

    public get loopEndIndex() {
        return this._panel.scroller.loopEndIndex(this._panel);
    }

    // CharacterDictionary
    public addCharacters(characters: Character[]) {
        this._dictionary.add(characters);
    }
    public addCharacter(character: Character) {
        this._dictionary.add([character]);
    }

    public editCharacter(character: Character) {
        this._dictionary.edit(character);
    }

    public deleteCharacter(character: Character) {
        this._dictionary.delete(character);
    }

    public get loadedCharacters() {
        return this._dictionary.characters;
    }

    // Board
    public get usedCharacters() {
        return this._panel.board.characters;
    }

    public set letterSpacing(value: number) {
        this._panel.board.letterSpacing = value;
    }

    public get letterSpacing() {
        return this._panel.board.letterSpacing;
    }

    public set padding(value: Padding) {
        this._panel.board.padding = value;
    }

    public get padding() {
        return this._panel.board.padding;
    }

    public get width() {
        return this._panel.board.width;
    }

    public get height() {
        return this._panel.board.height;
    }

    public set input(value: string) {
        this._panel.board.load(value, this._dictionary);
    }

    public get input() {
        return this._panel.board.input;
    }

    // Panel
    public get sequence() {
        return this._panel.GetCurrentSequence();
    }

    public set scroller(value: Scroller) {
        this._panel.scroller = value;
    }

    public get scroller() {
        return this._panel.scroller;
    }

    public get reverse() {
        return this._panel.reverse;
    }

    public set increment(value: number) {
        this._panel.increment = value;
    }

    public get increment() {
        return this._panel.increment;
    }

    public set reverse(value: boolean) {
        this._panel.reverse = value;
    }

    public set viewportWidth(value: number) {
        this._panel.width = value;
    }

    public get viewportWidth() {
        return this._panel.width;
    }

    // LedMatrix private
    private _validateParameters(params: LedMatrixParameters) {
        let defaultParams: LedMatrixParameters = {
            increment: 1,
            scroller: new SideScroller(),
            reverse: false,
            panelWidth: 80,
            letterSpacing: 2,
            padding: [0, 4],
            size: 1
        }

        if (params) {
            params.letterSpacing = this._valueOrDefault(params.letterSpacing, defaultParams.letterSpacing);
            params.padding = this._valueOrDefault(params.padding, defaultParams.padding);
            params.size = this._valueOrDefault(params.size, defaultParams.size);
            params.increment = this._valueOrDefault(params.increment, defaultParams.increment);
            params.scroller = this._valueOrDefault(params.scroller, defaultParams.scroller);
            params.reverse = this._valueOrDefault(params.reverse, defaultParams.reverse);
            params.panelWidth = this._valueOrDefault(params.panelWidth, defaultParams.panelWidth);

            return params;
        }

        return defaultParams;
    }

    private _valueOrDefault<T>(value: T, defaultValue: T) {
        return value ? value : defaultValue;
    }
}