import BitArray from "./bit-array";
import { bit } from "./types";

export default class Character {
  private _patterns: Array<string>;
  private _output: BitArray;
  private _width: number;
  private _height: number;


  /**
   * Creates a character
   * @param patterns The strings for which the dictionary will pick this character
   * @param output The bit representation of the character
   * @param width  The width of the character
   */
  constructor(patterns: Array<string>, output: BitArray, width: number) {
    this._patterns = patterns;
    this._output = output;
    if (output.size >= width) {
      this._width = width;
    } else {
      throw `Output size (${output.size}) can't be smaller than the character's width (${width})`;
    }
    
    if (output.size % width === 0) {
      this._height = output.size / width;
    } else {
      throw `Output size (${output.size}) must be divisible by the character's width (${width})`; 
    }
  }
  
  /**
   * Gets a column of the character at an index
   * @param index The index of the column
   */
  getColumn(index: number): bit[] {
    if (index > this._width) {
      throw `Index (${index}) is greater than the width of the character (${this._width})`;
    }

    let column:bit[] = [];
    for(let i = 0; i < this._height; i++) {
      column.push(this._output.atIndex(i * this._width + index));
    }

    return column;
  } 

  /**
   * Gets the width of the character
   */
  get width() {
    return this._width;
  }

  /**
   * Gets the height of the character
   */
  get height() {
    return this._height;
  }

  /**
   * Matches the character against a string to determine whether the input produces this character
   * @param input The input string to match the character against
   */
  hasPattern(input: string): boolean {
    return this._patterns.indexOf(input) >= 0;
  }
};