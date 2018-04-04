[led-matrix-ts](../README.md) > ["character"](../modules/_character_.md) > [Character](../classes/_character_.character.md)



# Class: Character

## Index

### Constructors

* [constructor](_character_.character.md#constructor)


### Properties

* [_height](_character_.character.md#_height)
* [_output](_character_.character.md#_output)
* [_patterns](_character_.character.md#_patterns)
* [_width](_character_.character.md#_width)


### Accessors

* [height](_character_.character.md#height)
* [width](_character_.character.md#width)


### Methods

* [getColumn](_character_.character.md#getcolumn)
* [hasPattern](_character_.character.md#haspattern)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Character**(patterns: *`Array`.<`string`>*, output: *[BitArray](_bit_array_.bitarray.md)*, width: *`number`*): [Character](_character_.character.md)


*Defined in [character.ts:7](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L7)*



Creates a character


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| patterns | `Array`.<`string`>   |  The strings for which the dictionary will pick this character |
| output | [BitArray](_bit_array_.bitarray.md)   |  The bit representation of the character |
| width | `number`   |  The width of the character |





**Returns:** [Character](_character_.character.md)

---


## Properties
<a id="_height"></a>

### «Private» _height

**●  _height**:  *`number`* 

*Defined in [character.ts:7](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L7)*





___

<a id="_output"></a>

### «Private» _output

**●  _output**:  *[BitArray](_bit_array_.bitarray.md)* 

*Defined in [character.ts:5](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L5)*





___

<a id="_patterns"></a>

### «Private» _patterns

**●  _patterns**:  *`Array`.<`string`>* 

*Defined in [character.ts:4](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L4)*





___

<a id="_width"></a>

### «Private» _width

**●  _width**:  *`number`* 

*Defined in [character.ts:6](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L6)*





___


## Accessors
<a id="height"></a>

###  height


getheight(): `number`

*Defined in [character.ts:59](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L59)*



Gets the height of the character




**Returns:** `number`



___

<a id="width"></a>

###  width


getwidth(): `number`

*Defined in [character.ts:52](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L52)*



Gets the width of the character




**Returns:** `number`



___


## Methods
<a id="getcolumn"></a>

###  getColumn

► **getColumn**(index: *`number`*): [bit](../modules/_bit_array_.md#bit)[]



*Defined in [character.ts:36](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L36)*



Gets a column of the character at an index


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  The index of the column |





**Returns:** [bit](../modules/_bit_array_.md#bit)[]





___

<a id="haspattern"></a>

###  hasPattern

► **hasPattern**(input: *`string`*): `boolean`



*Defined in [character.ts:67](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/character.ts#L67)*



Matches the character against a string to determine whether the input produces this character


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `string`   |  The input string to match the character against |





**Returns:** `boolean`





___


