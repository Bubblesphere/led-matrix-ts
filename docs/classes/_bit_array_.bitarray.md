[led-matrix-ts](../README.md) > ["bit-array"](../modules/_bit_array_.md) > [BitArray](../classes/_bit_array_.bitarray.md)



# Class: BitArray

## Index

### Constructors

* [constructor](_bit_array_.bitarray.md#constructor)


### Properties

* [_array](_bit_array_.bitarray.md#_array)
* [_bitPerIndex](_bit_array_.bitarray.md#_bitperindex)
* [_pointer](_bit_array_.bitarray.md#_pointer)
* [_size](_bit_array_.bitarray.md#_size)


### Accessors

* [size](_bit_array_.bitarray.md#size)


### Methods

* [_arrayIndex](_bit_array_.bitarray.md#_arrayindex)
* [_arrayIndexOffset](_bit_array_.bitarray.md#_arrayindexoffset)
* [_createMask](_bit_array_.bitarray.md#_createmask)
* [_matchesMask](_bit_array_.bitarray.md#_matchesmask)
* [atIndex](_bit_array_.bitarray.md#atindex)
* [atIndexRange](_bit_array_.bitarray.md#atindexrange)
* [push](_bit_array_.bitarray.md#push)
* [pushAll](_bit_array_.bitarray.md#pushall)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new BitArray**(values: *`Array`.<[bit](../modules/_bit_array_.md#bit)>*): [BitArray](_bit_array_.bitarray.md)


*Defined in [bit-array.ts:9](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L9)*



Creates a bitArray


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `Array`.<[bit](../modules/_bit_array_.md#bit)>   |  The bits to push onto the array |





**Returns:** [BitArray](_bit_array_.bitarray.md)

---


## Properties
<a id="_array"></a>

### «Private» _array

**●  _array**:  *`Uint8Array`* 

*Defined in [bit-array.ts:6](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L6)*





___

<a id="_bitperindex"></a>

### «Private» _bitPerIndex

**●  _bitPerIndex**:  *`number`*  = 8

*Defined in [bit-array.ts:9](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L9)*





___

<a id="_pointer"></a>

### «Private» _pointer

**●  _pointer**:  *`number`* 

*Defined in [bit-array.ts:8](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L8)*





___

<a id="_size"></a>

### «Private» _size

**●  _size**:  *`number`* 

*Defined in [bit-array.ts:7](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L7)*





___


## Accessors
<a id="size"></a>

###  size


getsize(): `number`

*Defined in [bit-array.ts:25](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L25)*



Gets the size of the array




**Returns:** `number`



___


## Methods
<a id="_arrayindex"></a>

### «Private» _arrayIndex

► **_arrayIndex**(index: *`number`*): `number`



*Defined in [bit-array.ts:111](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L111)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |





**Returns:** `number`





___

<a id="_arrayindexoffset"></a>

### «Private» _arrayIndexOffset

► **_arrayIndexOffset**(index: *`number`*): `number`



*Defined in [bit-array.ts:116](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L116)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |





**Returns:** `number`





___

<a id="_createmask"></a>

### «Private» _createMask

► **_createMask**(index: *`number`*): [byte](../modules/_bit_array_.md#byte)



*Defined in [bit-array.ts:104](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L104)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  - |





**Returns:** [byte](../modules/_bit_array_.md#byte)





___

<a id="_matchesmask"></a>

### «Private» _matchesMask

► **_matchesMask**(mask: *[byte](../modules/_bit_array_.md#byte)*, value: *[byte](../modules/_bit_array_.md#byte)*): `boolean`



*Defined in [bit-array.ts:98](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L98)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| mask | [byte](../modules/_bit_array_.md#byte)   |  - |
| value | [byte](../modules/_bit_array_.md#byte)   |  - |





**Returns:** `boolean`





___

<a id="atindex"></a>

###  atIndex

► **atIndex**(index: *`number`*): [bit](../modules/_bit_array_.md#bit)



*Defined in [bit-array.ts:70](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L70)*



Gets the bit at a given index


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  The index of the bit to return |





**Returns:** [bit](../modules/_bit_array_.md#bit)





___

<a id="atindexrange"></a>

###  atIndexRange

► **atIndexRange**(index: *`number`*, count: *`number`*): [bit](../modules/_bit_array_.md#bit)[]



*Defined in [bit-array.ts:84](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L84)*



Gets count bits at a given index


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| index | `number`   |  The index of the first bit to return |
| count | `number`   |  The amount of bits to fetch starting at the index |





**Returns:** [bit](../modules/_bit_array_.md#bit)[]





___

<a id="push"></a>

###  push

► **push**(value: *[bit](../modules/_bit_array_.md#bit)*): `void`



*Defined in [bit-array.ts:33](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L33)*



Pushes a single bit onto the array


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| value | [bit](../modules/_bit_array_.md#bit)   |  The bit to push onto the array |





**Returns:** `void`





___

<a id="pushall"></a>

###  pushAll

► **pushAll**(values: *`Array`.<[bit](../modules/_bit_array_.md#bit)>*): `void`



*Defined in [bit-array.ts:59](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/bit-array.ts#L59)*



Pushes a an array of bits onto the array


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| values | `Array`.<[bit](../modules/_bit_array_.md#bit)>   |  The bits to push onto the array |





**Returns:** `void`





___


