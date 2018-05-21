import Character from "./character";
import { bit } from "./bit-array";

export type ICharacterArray = Array<Character>;
export type PanelRenderer = (display: Array<Array<bit>>) => any