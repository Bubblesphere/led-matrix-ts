import { Board } from "./board";
import { Panel } from "./panel";
import { PanelBuilder, PanelType } from "./panel-builder";
import { RendererBuilder, RendererType } from "./renderer-builder";
import { Padding } from "./types";
import { Renderer, IRendererParameters } from "./rendering/renderer";
import { Event, IEvent } from "./event";
import { bit } from "./bit-array";
import { CharacterDictionary } from "./character-dictionary";
import { CharactersJSON } from "./character-json";
import { Character } from "./character";

interface ExposedBoardParameters {
    letterSpacing?: number
    padding?: Padding,
    input?: string
}

interface ExposedPanelParameters {
    panelType?: PanelType,
    /**  */
    renderer?: Renderer,
    /** Increment at each frame */
    increment?: number,
    /** Frames of the panel scrolled per second */
    fps?: number,
    /** The width of the panel in bits displayed */
    panelWidth?: number,
    /** Whether the panel animation should be reverse */
    reverse?: boolean
}

interface RendererBuilderParameters {
    rendererType?: RendererType,
    elementId?: string
}

interface SetRendererBuilderParameters {
    rendererType: RendererType,
    elementId: string
}

export type LedMatrixParameters = {pathCharacters?: string} & ExposedBoardParameters & ExposedPanelParameters & RendererBuilderParameters;


export class LedMatrix implements LedMatrixParameters {
    private _params: LedMatrixParameters;
    private _board: Board;
    private _dictionary: CharacterDictionary;
    private _panel: Panel;
    private _panelType: PanelType;
    private _size: number;

    private readonly onReady = new Event<void>();
    public event: {
        panelUpdate: IEvent<{ display: bit[][]; }>,
        reachingBoundary: IEvent<void>
        ready: IEvent<void>
    };

    constructor(params?: LedMatrixParameters) {
        this._params = this._validateParameters(params);

        this._board = new Board({
            letterSpacing: this._params.letterSpacing,
            padding: this._params.padding
        });
        this._panelType = this._params.panelType;
        this._panel = PanelBuilder.build(
            this._params.panelType, 
            { 
                board: this._board, 
                renderer: this._params.renderer,
                fps: this._params.fps,
                increment: this._params.increment,
                reverse: this._params.reverse,
                width: this._params.panelWidth
            }
        );

        this.event = {
            panelUpdate: this._panel.PanelUpdate,
            reachingBoundary: this._panel.ReachingBoundary,
            ready: this.Ready
        };
    }

    public get Ready() { return this.onReady.expose(); }

    public init(size?: number,callback?: () => any) {
        CharactersJSON.import(this._params.pathCharacters, size ? size:  1, (characters) => {
            this._dictionary = new CharacterDictionary();
            this._dictionary.add(characters);
            this._board.load(this._board.input != null ? this._board.input : this._params.input, this._dictionary);
            //this._panel.play();
            this.onReady.trigger();
            if (callback) {
                callback();
            }
        });
    }

    public get size() {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
        this.init(value);
    }

    public get index() {
        return this._panel.index;
    }

    public get indexUpperBound() {
        return this._panel.indexUpperBound;
    }

    // CharacterDictionary
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
        return this._board.characters;
    }

    public set spacing(value: number) {
        this._board.letterSpacing = value;
        // Any changes to the board requires to reassign it to the panel
        this._panel.board = this._board;
    }

    public get spacing() {
        return this._board.letterSpacing;
    }

    public set padding(value: Padding) {
        this._board.padding = value;
        // Any changes to the board requires to reassign it to the panel
        this._panel.board = this._board;
    }

    public get padding() {
        return this._board.padding;
    }

    public get width() {
        return this._board.width;
    }

    public get height() {
        return this._board.height;
    }

    public set input(value: string) {
        this._board.load(value, this._dictionary);
    }

    public get input() {
        return this._board.input;
    }

    // Panel
    public play() {
        this._panel.play();
    }

    public stop() {
        this._panel.stop();
    }

    public pause() {
        this._panel.pause();
    }

    public resume() {
        this._panel.resume();
    }

    public tick() {
        this._panel.tick();
    }

    public seek(frame: number) {
        this._panel.seek(frame);
    }

    public set panelType(value: PanelType) {
        this._panelType = value;
        this._panel.stop();
        this._panel = PanelBuilder.build(this._panelType,
            { 
                board: this._board, 
                renderer: this._panel.renderer,
                fps: this._panel.fps,
                increment: this._panel.increment,
                reverse: this._panel.reverse,
                width: this._panel.width
            }
        );
        this._panel.play();
    }

    public get panelType() {
        return this._panelType;
    }

    public set renderer(value: Renderer) {
        this._panel.renderer = value;
    }

    public setRendererFromBuilder(value: SetRendererBuilderParameters) {
        this._panel.renderer = RendererBuilder.build(value.rendererType, value.elementId);
    }

    public get renderer() {
        return this._panel.renderer;
    }

    public set fps(value: number) {
        this._panel.fps = value;
    }

    public get fps() {
        return this._panel.fps;
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

    public get reverse() {
        return this._panel.reverse;
    }

    public set viewportWidth(value: number) {
        this._panel.width = value;
    }

    public get viewportWidth() {
        return this._panel.width;
    }
    

    // LedMatrix private
    private _validateParameters(params: LedMatrixParameters) {
        const defaultParams: LedMatrixParameters = {
            input: "hello world",
            pathCharacters: "alphabet.json",
            fps: 30,
            increment: 1,
            panelType: PanelType.SideScrollingPanel,
            rendererType: RendererType.ASCII,
            elementId: 'led-matrix',
            reverse: false,
            panelWidth: 80,
            letterSpacing: 2,
            padding: [0, 4]
        }

        if (params) {
            params.input = this._valueOrDefault(params.input, defaultParams.input);
            params.pathCharacters = this._valueOrDefault(params.pathCharacters, defaultParams.pathCharacters);
            params.letterSpacing = this._valueOrDefault(params.letterSpacing, defaultParams.letterSpacing);
            params.padding = this._valueOrDefault(params.padding, defaultParams.padding);
            params.fps = this._valueOrDefault(params.fps, defaultParams.fps);
            params.increment = this._valueOrDefault(params.increment, defaultParams.increment);
            params.panelType = this._valueOrDefault(params.panelType, defaultParams.panelType);;
            params.reverse = this._valueOrDefault(params.reverse, defaultParams.reverse);
            params.panelWidth = this._valueOrDefault(params.panelWidth, defaultParams.panelWidth);

            if (params.renderer != null) {
                params.renderer = params.renderer;
            } else {
                params.rendererType = this._valueOrDefault(params.rendererType, defaultParams.rendererType)
                params.elementId = this._valueOrDefault(params.elementId, defaultParams.elementId);
                params.renderer = RendererBuilder.build(params.rendererType, params.elementId);
            }
            

            return params;
        }

        return defaultParams;
    }

    private _valueOrDefault<T>(value: T, defaultValue: T) {
        return value ? value : defaultValue;
    }
}