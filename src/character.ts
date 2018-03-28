import BitArray from "./bit-array";

export default class Character {
  private _patterns: Array<string>;
  private _output: Array<BitArray>;

  constructor(patterns: Array<string>, output: Array<BitArray>) {
    this._patterns = patterns;
    this._output = output;
  }
  
  getOutputColumn(index: number): BitArray {
    return this._output[index];
  } 

  pushOutputColumn( value: BitArray): void {
    this._output.push(value);
  }

  set output(value: Array<BitArray>) {
    this._output = value;
  }

  hasPattern(input: string): boolean {
    return this._patterns.indexOf(input) >= 0;
  }

  outputLength() {
    return this._output.length;
  }
};