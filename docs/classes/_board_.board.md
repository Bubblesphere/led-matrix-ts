[led-matrix-ts](../README.md) > ["board"](../modules/_board_.md) > [Board](../classes/_board_.board.md)



# Class: Board

## Index

### Constructors

* [constructor](_board_.board.md#constructor)


### Properties

* [_characterCount](_board_.board.md#_charactercount)
* [_characters](_board_.board.md#_characters)
* [_spacing](_board_.board.md#_spacing)


### Accessors

* [width](_board_.board.md#width)


### Methods

* [_addSpacing](_board_.board.md#_addspacing)
* [_getCharacterAtIndex](_board_.board.md#_getcharacteratindex)
* [_getCharacterOffsetAtIndex](_board_.board.md#_getcharacteroffsetatindex)
* [getAtIndex](_board_.board.md#getatindex)
* [load](_board_.board.md#load)
* [reset](_board_.board.md#reset)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Board**(spacing?: *`number`*): [Board](_board_.board.md)


*Defined in [board.ts:8](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L8)*



Creates a board


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| spacing | `number`  | 2 |   The spacing between characters |





**Returns:** [Board](_board_.board.md)

---


## Properties
<a id="_charactercount"></a>

### «Private» _characterCount

**●  _characterCount**:  *`number`* 

*Defined in [board.ts:8](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L8)*





___

<a id="_characters"></a>

### «Private» _characters

**●  _characters**:  *`Array`.<[Character](_character_.character.md)>* 

*Defined in [board.ts:6](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L6)*





___

<a id="_spacing"></a>

### «Private» _spacing

**●  _spacing**:  *`number`* 

*Defined in [board.ts:7](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L7)*





___


## Accessors
<a id="width"></a>

###  width


getwidth(): `number`

*Defined in [board.ts:48](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L48)*



Returns the total width of all characters on the board




**Returns:** `number`



___


## Methods
<a id="_addspacing"></a>

### «Private» _addSpacing

► **_addSpacing**(): `void`



*Defined in [board.ts:19](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L19)*





**Returns:** `void`





___

<a id="_getcharacteratindex"></a>

### «Private» _getCharacterAtIndex

► **_getCharacterAtIndex**(index: *`number`*): `number`



*Defined in [board.ts:27](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L27)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |





**Returns:** `number`





___

<a id="_getcharacteroffsetatindex"></a>

### «Private» _getCharacterOffsetAtIndex

► **_getCharacterOffsetAtIndex**(index: *`number`*): `number`



*Defined in [board.ts:36](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L36)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |





**Returns:** `number`





___

<a id="getatindex"></a>

###  getAtIndex

► **getAtIndex**(index: *`number`*): `Array`.<[bit](../modules/_bit_array_.md#bit)>



*Defined in [board.ts:58](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L58)*



Gets the column of the board at the specified index


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  The index of the column to fetch |





**Returns:** `Array`.<[bit](../modules/_bit_array_.md#bit)>





___

<a id="load"></a>

###  load

► **load**(input: *`String`*, dictionnary: *[CharacterDictionary](_character_dictionary_.characterdictionary.md)*): `void`



*Defined in [board.ts:76](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L76)*



Loads a new input onto the board


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| input | `String`   |  The input to load on the board |
| dictionnary | [CharacterDictionary](_character_dictionary_.characterdictionary.md)   |  The dictionnary for which the input is tested against |





**Returns:** `void`





___

<a id="reset"></a>

###  reset

► **reset**(): `void`



*Defined in [board.ts:67](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/board.ts#L67)*



Clears the board




**Returns:** `void`





___


