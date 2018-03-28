import BitArray from "./bit-array";
import Character from "./character";

export const Alphabet = [
  new Character(['a', 'A'], [
    new BitArray([0, 0, 0, 0, 0, 0, 1, 1]),
    new BitArray([0, 0, 0, 0, 1, 1, 0, 0]),
    new BitArray([0, 0, 1, 1, 0, 1, 0, 0]),
    new BitArray([1, 1, 0, 0, 0, 1, 0, 0]),
    new BitArray([0, 0, 1, 1, 0, 1, 0, 0]),
    new BitArray([0, 0, 0, 0, 1, 1, 0, 0]),
    new BitArray([0, 0, 0, 0, 0, 0, 1, 1])]
  ),
  new Character(['b', 'B'], [
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
    new BitArray([0, 1, 1, 0, 1, 1, 1, 0])
  ]),
  new Character(['c', 'C'], [
    new BitArray([0, 0, 1, 1, 1, 1, 1, 0]),
    new BitArray([0, 1, 0, 0, 0, 0, 1, 0]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1])
  ]),
  new Character(['d', 'D'], [
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 1, 0]),
    new BitArray([0, 1, 1, 1, 1, 1, 0, 0])
  ]),
  new Character(['e', 'E'], [
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 1]),
  ]),
  new Character(['f', 'F'], [
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 0]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 0]),
    new BitArray([1, 0, 0, 1, 0, 0, 0, 0]),
  ]),
  new Character(['g', 'G'], [
    new BitArray([0, 1, 1, 1, 1, 1, 1, 0]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 1, 0, 1, 0]),
    new BitArray([0, 1, 0, 0, 1, 1, 1, 0]),
  ]),
  new Character(['h', 'H'], [
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([0, 0, 0, 1, 0, 0, 0, 0]),
    new BitArray([0, 0, 0, 1, 0, 0, 0, 0]),
    new BitArray([0, 0, 0, 1, 0, 0, 0, 0]),
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
  ]),
  new Character(['i', 'I'], [
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
  ]),
  new Character(['j', 'J'], [
    new BitArray([1, 0, 0, 0, 0, 0, 1, 0]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 1]),
    new BitArray([1, 1, 1, 1, 1, 1, 1, 1]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 0]),
    new BitArray([1, 0, 0, 0, 0, 0, 0, 0]),
  ])
];