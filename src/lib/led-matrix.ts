import Board, { ExposedBoardParameters } from "./board";
import CharacterDictionary from './alphabet';
import AlphabetJSON from "./alphabet-json";
import Panel, { ExposedPanelParameters } from "./panel";
import PanelBuilder, { PanelType } from "./panel-builder";
import AsciiRenderer from "./rendering/ascii-renderer";

export interface LedMatrixParameters {
    pathCharacters?: string;
    input?: string;
    options?: {
        board?: ExposedBoardParameters;
        panel?: ExposedPanelParameters;
    }
}

export default class LedMatrix {
    constructor(params?: LedMatrixParameters) {
        params = this._validateParameters(params);

        AlphabetJSON.import(params.pathCharacters, (characters) => {
            const board = new Board({
                spacing: params.options.board.spacing,
                padding: params.options.board.padding
            });

            const dictionary = new CharacterDictionary();
            dictionary.add(characters);

            board.load(params.input, dictionary);

            const panel = PanelBuilder.build(
                params.options.panel.panelType, 
                { 
                    board: board, 
                    renderer: params.options.panel.renderer,
                    fps: params.options.panel.fps,
                    increment: params.options.panel.increment,
                    reverse: params.options.panel.reverse,
                    width: params.options.panel.width
                }
            );
            
            panel.play();
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
}