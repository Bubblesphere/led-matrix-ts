import Board from "./board";
import CharacterDictionary from './alphabet';
import AlphabetJSON from "./alphabet-json";
import Panel, { ExposedPanelParameters } from "./panel";
import PanelBuilder, { PanelType } from "./panel-builder";
import AsciiRenderer from "./rendering/ascii-renderer";

export interface LedMatrixParameters {
    pathCharacters: string;
    input: string;
    options: ExposedPanelParameters;
}

export default class LedMatrix {
    constructor(params?: LedMatrixParameters) {
        params = this._validateParameters(params);

        AlphabetJSON.import(params.pathCharacters, (characters) => {
            const board = new Board();

            const dictionary = new CharacterDictionary();
            dictionary.add(characters);

            const panel = PanelBuilder.build(
                params.options.panelType, 
                { 
                    board: board, 
                    renderer: params.options.renderer,
                    fps: params.options.fps,
                    increment: params.options.increment,
                    reverse: params.options.reverse,
                    width: params.options.width
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
            }
        }

        if (params) {
            params.input = this._valueOrDefault(params.input, defaultParams.input);
            params.pathCharacters = this._valueOrDefault(params.input, defaultParams.pathCharacters);
            params.options =  {
                fps: this._valueOrDefault(params.options.fps, defaultParams.options.fps),
                increment: this._valueOrDefault(params.options.increment, defaultParams.options.increment),
                panelType: this._valueOrDefault(params.options.panelType, PanelType.SideScrollingPanel),
                renderer: this._valueOrDefault(params.options.renderer, defaultParams.options.renderer),
                reverse: this._valueOrDefault(params.options.reverse, defaultParams.options.reverse),
                width: this._valueOrDefault(params.options.width, defaultParams.options.width),
            }
        }

        return defaultParams;
    }

    private _valueOrDefault<T>(value: T, defaultValue: T) {
        return value ? value : defaultValue;
    }
}