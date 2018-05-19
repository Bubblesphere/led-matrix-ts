import Character from "./character";
import { bit } from "./bit-array";

export type IAlphabet = Array<Character>;
export type PanelRenderer = (display: Array<Array<bit>>) => any