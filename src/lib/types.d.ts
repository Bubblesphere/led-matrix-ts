import Character from "./character";
import { bit } from "./bit-array";

export type ICharacterArray = Array<Character>;
export type Display = Array<Array<bit>>;
export type PanelRenderer = (display: Display) => any
