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
import { PanelRecorder } from './panel-recorder';
import { PanelPlayer } from "./panel-player";


interface ExposedBoardParameters {
    letterSpacing?: number
    padding?: Padding,
    size?: number
}

interface ExposedPanelParameters {
    panelType?: PanelType,
    /**  */
    renderer?: Renderer | RendererBuilderParameters,
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

export type LedMatrixParameters = 
    ExposedBoardParameters & 
    ExposedPanelParameters & 
    RendererBuilderParameters;


export class LedMatrix implements LedMatrixParameters {
    private _params: LedMatrixParameters;
    private _board: Board;
    private _dictionary: CharacterDictionary;
    private _panelPlayer: PanelPlayer;
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
            padding: this._params.padding,
            size: this._params.size
        });
        this._panelType = this._params.panelType;

        this._panelPlayer = PanelBuilder.build(
            this._params.panelType, 
            { 
                renderer: this._params.renderer as Renderer,
                fps: this._params.fps,
                panelSequencer: null
            },
            {
                board: this._board,
                increment: this._params.increment,
                reverse: this._params.reverse,
                width: this._params.panelWidth
            }
        );

        this.event = {
            panelUpdate: this._panelPlayer.PanelUpdate,
            reachingBoundary: this._panelPlayer.ReachingBoundary,
            ready: this.Ready
        };

        this._dictionary = new CharacterDictionary();
    }

    public get Ready() { return this.onReady.expose(); }

    public get size() {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
        
        this._board.load(this.input, this._dictionary, this.size);

        // Any changes to the board requires to reassign it to the panel
        this._panelPlayer.panelSequencer.board = this._board;
    }

    public get index() {
        return this._panelPlayer.index;
    }

    public get indexUpperBound() {
        return this._panelPlayer.panelSequencer.indexUpperBound;
    }

    // PanelRecorder
    /*public getSequence() {
        return PanelRecorder.getSequence(this._panelPlayer);
    }*/

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
        return this._board.characters;
    }

    public set spacing(value: number) {
        this._board.letterSpacing = value;
        // Any changes to the board requires to reassign it to the panel
        this._panelPlayer.panelSequencer.board = this._board;
    }

    public get spacing() {
        return this._board.letterSpacing;
    }

    public set padding(value: Padding) {
        this._board.padding = value;
        // Any changes to the board requires to reassign it to the panel
        this._panelPlayer.panelSequencer.board = this._board;
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
        // Any changes to the board requires to reassign it to the panel
        this._panelPlayer.panelSequencer.board = this._board;
    }

    public get input() {
        return this._board.input;
    }

    // Panel
    public play() {
        this._panelPlayer.play();
    }

    public stop() {
        this._panelPlayer.stop();
    }

    public pause() {
        this._panelPlayer.pause();
    }

    public resume() {
        this._panelPlayer.resume();
    }

    public step() {
        this._panelPlayer.step();
    }

    public seek(frame: number) {
        this._panelPlayer.seek(frame);
    }

    public set panelType(value: PanelType) {
        this._panelType = value;
        this._panelPlayer.stop();
        this._panelPlayer = PanelBuilder.build(this._panelType,
            {  
                renderer: this._panelPlayer.renderer,
                fps: this._panelPlayer.fps,
                panelSequencer: null
            },
            { 
                board: this._board,
                increment: this._panelPlayer.panelSequencer.increment,
                reverse: this._panelPlayer.panelSequencer.reverse,
                width: this._panelPlayer.panelSequencer.width
            }
        );
        this._panelPlayer.play();
    }

    public get panelType() {
        return this._panelType;
    }

    public set renderer(value: Renderer) {
        this._panelPlayer.renderer = value;
    }

    public setRendererFromBuilder(value: SetRendererBuilderParameters) {
        this._panelPlayer.renderer = RendererBuilder.build(value.rendererType, value.elementId);
    }

    public get renderer() {
        return this._panelPlayer.renderer;
    }

    public set fps(value: number) {
        this._panelPlayer.fps = value;
    }

    public get fps() {
        return this._panelPlayer.fps;
    }

    public set increment(value: number) {
        this._panelPlayer.panelSequencer.increment = value;
    }

    public get increment() {
        return this._panelPlayer.panelSequencer.increment;
    }

    public set reverse(value: boolean) {
        this._panelPlayer.panelSequencer.reverse = value;
    }

    public get reverse() {
        return this._panelPlayer.panelSequencer.reverse;
    }

    public set viewportWidth(value: number) {
        this._panelPlayer.panelSequencer.width = value;
    }

    public get viewportWidth() {
        return this._panelPlayer.panelSequencer.width;
    }
    

    // LedMatrix private
    private _validateParameters(params: LedMatrixParameters) {
        let defaultParams: LedMatrixParameters = {
            fps: 30,
            increment: 1,
            panelType: PanelType.SideScrollingPanel,
            rendererType: RendererType.ASCII,
            elementId: 'led-matrix',
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
            params.fps = this._valueOrDefault(params.fps, defaultParams.fps);
            params.increment = this._valueOrDefault(params.increment, defaultParams.increment);
            params.panelType = this._valueOrDefault(params.panelType, defaultParams.panelType);;
            params.reverse = this._valueOrDefault(params.reverse, defaultParams.reverse);
            params.panelWidth = this._valueOrDefault(params.panelWidth, defaultParams.panelWidth);

            if (params.renderer instanceof Renderer) {
                params.renderer = params.renderer;
            } else {
                params.renderer = RendererBuilder.build(this._valueOrDefault(params.renderer.rendererType, defaultParams.rendererType), this._valueOrDefault(params.elementId, defaultParams.elementId));
            }
            

            return params;
        }

        defaultParams.renderer = RendererBuilder.build(defaultParams.rendererType, defaultParams.elementId);
        return defaultParams;
    }

    private _valueOrDefault<T>(value: T, defaultValue: T) {
        return value ? value : defaultValue;
    }
}