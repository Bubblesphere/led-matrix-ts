import Character from "./character";
import { bit } from "./bit-array";

export type ICharacterArray = Array<Character>;
export type PanelDisplay = Array<Array<bit>>;
export type PanelRenderer = (display: PanelDisplay, ...other: any[]) => any
