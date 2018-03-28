import BitArray, { bit } from "./bit-array";

export default class Character {
  private _patterns: Array<string>;
  private _output: BitArray;
  private _width: number;
  private _height: number;

  constructor(patterns: Array<string>, output: BitArray, width: number) {
    this._patterns = patterns;
    this._output = output;
    if (output.size > width) {
      this._width = width;
    } else {
      throw `Output size (${output.size}) can't be smaller than the character's width (${width})`;
    }
    
    if (output.size % width === 0) {
      this._height = output.size / width;
    } else {
      throw `Output size (${output.size}) must be a factor of the character's width (${width})`; 
    }
  }
  
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

  /*
  pushOutputColumn( value: Array<bit>): void {
    value.slice(this._width - 1).forEach((bit) => {
      this._output.push(bit);
    })
    
  }
  */

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  /*
  set output(value: BitArray) {
    this._output = value;
  }
  */

  hasPattern(input: string): boolean {
    return this._patterns.indexOf(input) >= 0;
  }
};