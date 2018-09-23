import Character from "./character";
import { bit } from "./bit-array";

export interface CharactersJSONSchema {
    height: number,
    characters: CharacterJSONSchema[]
}

export interface CharacterJSONSchema {
    patterns: Array<string>,
    output: Array<number>,
    width: number
}

export type PanelDisplay = Array<Array<bit>>;
export type PanelRenderer = (display: PanelDisplay, ...other: any[]) => any

export type DetailedPadding = [number, number, number, number];
export type Padding = DetailedPadding | [number, number] | [number];