import { bit } from "./utils/bit-array";

export interface CharactersJSONSchema {
    height: number,
    characters: CharacterJSONSchema[]
}

export interface CharacterJSONSchema {
    pattern: string,
    output: Array<number>,
    width: number
}

export type Sequence = PanelFrame[];
export type PanelFrame = Array<Array<bit>>;
export type PanelRenderer = (display: PanelFrame, ...other: any[]) => any

export type DetailedPadding = [number, number, number, number];
export type Padding = DetailedPadding | [number, number] | [number];