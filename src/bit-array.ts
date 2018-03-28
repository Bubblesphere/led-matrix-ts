type bit = 0 | 1;

type byte = number;

export default class BitArray {
  private _array: Uint8Array;
  private _size: number;
  private _pointer: number;
  private _bitPerIndex: number = 8;

  constructor(size: number) {
    this._array = new Uint8Array(Math.ceil(size/this._bitPerIndex));
    this._pointer = 0;
    this._size = size;
  }

  push(value: bit) {
    if (this._pointer == this._size) {
      throw "Array max size reached";
    }
    // create a mask for current index.
    const mask = this._createMask(this._pointer);
    // compare the array with the mask. A value different than 0 means the target bit is set
    if (this._matchesMask(mask, this._array[this._arrayIndex(this._pointer)])) {
      // bit is set in array. Should we toggle it?
      if (value === 0) {
        this._array[this._arrayIndex(this._pointer)] ^= mask;
      }
    } else {
      // bit is unset in array. Sould we toggle it?
      if (value === 1) {
        this._array[this._arrayIndex(this._pointer)] ^= mask;
      }
    }
    // increment pointer for next push
    this._pointer++;
  }

  atIndex(index: number): bit {
    if (index > this._size) {
      return null;
    }

    const mask = this._createMask(index);
    return this._matchesMask(mask, this._array[this._arrayIndex(index)]) ? 1 : 0;
  }
  
  private _matchesMask(mask: byte, value: byte) {
    // returns true if bit is set
    return (mask & value) != 0;
  }

  private _createMask(index: number): byte {
    // supposing the index is 2, the created mask is
    // 00100000
    return  1 << (this._bitPerIndex - 1) - this._arrayIndexOffset(index);
  }

  private _arrayIndex(index: number) {
    return Math.floor(index / this._bitPerIndex);
  }

  private _arrayIndexOffset(index: number) {
    return index % this._bitPerIndex;
  }
};