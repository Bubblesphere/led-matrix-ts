import Board, { ExposedBoardParameters } from "./board";
import CharacterDictionary from './alphabet';
import AlphabetJSON from "./alphabet-json";
import Panel, { ExposedPanelParameters } from "./panel";
import PanelBuilder, { PanelType } from "./panel-builder";
import AsciiRenderer from "./rendering/ascii-renderer";
import { Padding } from "./types";
import Renderer from "./rendering/renderer";
import { IEvent } from "./event";
import { bit } from "./bit-array";

export interface LedMatrixParameters {
    pathCharacters?: string;
    input?: string;
    options?: {
        board?: ExposedBoardParameters;
        panel?: ExposedPanelParameters;
    }
}

export default class LedMatrix implements LedMatrixParameters {
    private _board: Board;
    private _dictionary: CharacterDictionary;
    private _panel: Panel;
    private _panelType: PanelType;
    public event: {
        panelUpdate: IEvent<{
            display: bit[][];
          }>,
        panelUpdateBit: IEvent<{
            x: number;
            y: number;
            value: bit;
          }>,
        reachingBoundary: IEvent<void>
    };

    public init(params?: LedMatrixParameters, onReady?: () => any) {
        params = this._validateParameters(params);

        AlphabetJSON.import(params.pathCharacters, (characters) => {
            this._board = new Board({
                spacing: params.options.board.spacing,
                padding: params.options.board.padding
            });

            this._dictionary = new CharacterDictionary();
            this._dictionary.add(characters);

            this._board.load(params.input, this._dictionary);

            this._panel = PanelBuilder.build(
                params.options.panel.panelType, 
                { 
                    board: this._board, 
                    renderer: params.options.panel.renderer,
                    fps: params.options.panel.fps,
                    increment: params.options.panel.increment,
                    reverse: params.options.panel.reverse,
                    width: params.options.panel.width
                }
            );
            
            this.event = {
                panelUpdate: this._panel.PanelUpdate,
                panelUpdateBit: this._panel.PanelUpdateBit,
                reachingBoundary: this._panel.ReachingBoundary
            }

            this._panel.play();

            if (onReady) {
                onReady();
            }
        });
    }

    private _validateParameters(params: LedMatrixParameters) {
        const defaultParams: LedMatrixParameters = {
            input: "Hello World",
            pathCharacters: "test.json",
            options: {
                panel: {
                    fps: 30,
                    increment: 1,
                    panelType: PanelType.SideScrollingPanel,
                    renderer: new AsciiRenderer({
                        element: document.getElementById("led-matrix"),
                        characterBitOn: 'X',
                        characterBitOff: ' '
                    }),
                    reverse: false,
                    width: 80
                },
                board: {
                    spacing: 2,
                    padding: [0]
                }
            }
        }

        if (params) {
            params.input = this._valueOrDefault(params.input, defaultParams.input);
            params.pathCharacters = this._valueOrDefault(params.pathCharacters, defaultParams.pathCharacters);
            if (params.options) {
                if (params.options.board) {
                    params.options.board =  {
                        spacing: this._valueOrDefault(params.options.board.spacing, defaultParams.options.board.spacing),
                        padding: this._valueOrDefault(params.options.board.padding, defaultParams.options.board.padding),
                    }
                } else {
                    params.options.board = defaultParams.options.board;
                }

                if (params.options.panel) {
                    params.options.panel =  {
                        fps: this._valueOrDefault(params.options.panel.fps, defaultParams.options.panel.fps),
                        increment: this._valueOrDefault(params.options.panel.increment, defaultParams.options.panel.increment),
                        panelType: this._valueOrDefault(params.options.panel.panelType, defaultParams.options.panel.panelType),
                        renderer: this._valueOrDefault(params.options.panel.renderer, defaultParams.options.panel.renderer),
                        reverse: this._valueOrDefault(params.options.panel.reverse, defaultParams.options.panel.reverse),
                        width: this._valueOrDefault(params.options.panel.width, defaultParams.options.panel.width),
                    }
                } else {
                    params.options.panel = defaultParams.options.panel;
                }
            } else {
                params.options = defaultParams.options;
            }
            return params;
        }

        return defaultParams;
    }

    private _valueOrDefault<T>(value: T, defaultValue: T) {
        return value ? value : defaultValue;
    }

    // Board
    public set spacing(value: number) {
        this._board.spacing = value;
        // Any changes to the board requires to reassign it to the panel
        this._panel.board = this._board;
    }

    public get spacing() {
        return this._board.spacing;
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

    public seek(frame: number) {
        this._panel.seek(frame);
    }

    public set panelType(value: PanelType) {
        this._panelType = value;
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
    }

    public get panelType() {
        return this._panelType;
    }

    public set renderer(value: Renderer) {
        this._panel.renderer = value;
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


}