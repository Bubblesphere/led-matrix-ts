import Character from "./character";

export type IAlphabet = Array<Character>;
export type bit = 0 | 1;
export type byte = number;
export type PanelRenderer = (display: Array<Array<bit>>) => any