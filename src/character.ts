export default class Character {
  private _patterns: Array<string>;
  private _output: Array<Array<number>>;

  constructor(patterns: Array<string>, output: Array<Array<number>>) {
    this._patterns = patterns;
    this._output = output;
  }
  
  getOutputColumn(index: number): Array<number> {
    return this._output[index];
  } 

  pushOutputColumn( value: Array<number>): void {
    this._output.push(value);
  }

  set output(value: Array<Array<number>>) {
    this._output = value;
  }

  hasPattern(input: string): boolean {
    return this._patterns.indexOf(input) >= 0;
  }

  outputLength() {
    return this._output.length;
  }
};