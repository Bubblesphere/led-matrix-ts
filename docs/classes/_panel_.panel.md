[led-matrix-ts](../README.md) > ["panel"](../modules/_panel_.md) > [Panel](../classes/_panel_.panel.md)



# Class: Panel

## Index

### Constructors

* [constructor](_panel_.panel.md#constructor)


### Properties

* [_board](_panel_.panel.md#_board)
* [_display](_panel_.panel.md#_display)
* [_events](_panel_.panel.md#_events)
* [_fps](_panel_.panel.md#_fps)
* [_height](_panel_.panel.md#_height)
* [_index](_panel_.panel.md#_index)
* [_interval](_panel_.panel.md#_interval)
* [_width](_panel_.panel.md#_width)


### Methods

* [_clearExistingLoop](_panel_.panel.md#_clearexistingloop)
* [_generateDisplay](_panel_.panel.md#_generatedisplay)
* [_generateEmptyDisplay](_panel_.panel.md#_generateemptydisplay)
* [_loop](_panel_.panel.md#_loop)
* [_step](_panel_.panel.md#_step)
* [events](_panel_.panel.md#events)
* [pause](_panel_.panel.md#pause)
* [play](_panel_.panel.md#play)
* [resume](_panel_.panel.md#resume)
* [stop](_panel_.panel.md#stop)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new Panel**(params: *[PanelParameters](../interfaces/_panel_.panelparameters.md)*): [Panel](_panel_.panel.md)


*Defined in [panel.ts:30](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L30)*



Creates a Panel


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | [PanelParameters](../interfaces/_panel_.panelparameters.md)   |  The panel parameters |





**Returns:** [Panel](_panel_.panel.md)

---


## Properties
<a id="_board"></a>

### «Private» _board

**●  _board**:  *[Board](_board_.board.md)* 

*Defined in [panel.ts:29](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L29)*





___

<a id="_display"></a>

### «Private» _display

**●  _display**:  *`Array`.<`Array`.<`number`>>* 

*Defined in [panel.ts:26](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L26)*





___

<a id="_events"></a>

### «Private» _events

**●  _events**:  *[Events](../interfaces/_panel_.events.md)* 

*Defined in [panel.ts:30](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L30)*





___

<a id="_fps"></a>

### «Private» _fps

**●  _fps**:  *`number`* 

*Defined in [panel.ts:27](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L27)*





___

<a id="_height"></a>

### «Private» _height

**●  _height**:  *`number`* 

*Defined in [panel.ts:25](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L25)*





___

<a id="_index"></a>

### «Private» _index

**●  _index**:  *`number`* 

*Defined in [panel.ts:23](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L23)*





___

<a id="_interval"></a>

### «Private» _interval

**●  _interval**:  *`number`* 

*Defined in [panel.ts:28](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L28)*





___

<a id="_width"></a>

### «Private» _width

**●  _width**:  *`number`* 

*Defined in [panel.ts:24](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L24)*





___


## Methods
<a id="_clearexistingloop"></a>

### «Private» _clearExistingLoop

► **_clearExistingLoop**(): `void`



*Defined in [panel.ts:96](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L96)*





**Returns:** `void`





___

<a id="_generatedisplay"></a>

### «Private» _generateDisplay

► **_generateDisplay**(board: *[Board](_board_.board.md)*): `void`



*Defined in [panel.ts:53](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L53)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| board | [Board](_board_.board.md)   |  - |





**Returns:** `void`





___

<a id="_generateemptydisplay"></a>

### «Private» _generateEmptyDisplay

► **_generateEmptyDisplay**(): `void`



*Defined in [panel.ts:46](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L46)*





**Returns:** `void`





___

<a id="_loop"></a>

### «Private» _loop

► **_loop**(): `void`



*Defined in [panel.ts:88](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L88)*





**Returns:** `void`





___

<a id="_step"></a>

### «Private» _step

► **_step**(): `void`



*Defined in [panel.ts:64](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L64)*





**Returns:** `void`





___

<a id="events"></a>

###  events

► **events**(params: *[Events](../interfaces/_panel_.events.md)*): `void`



*Defined in [panel.ts:106](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L106)*



Binds callback methods for whenever an event is triggered


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| params | [Events](../interfaces/_panel_.events.md)   |  The events callbacks |





**Returns:** `void`





___

<a id="pause"></a>

###  pause

► **pause**(): `void`



*Defined in [panel.ts:140](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L140)*



Pauses the panel




**Returns:** `void`





___

<a id="play"></a>

###  play

► **play**(): `void`



*Defined in [panel.ts:116](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L116)*



Starts the panel




**Returns:** `void`





___

<a id="resume"></a>

###  resume

► **resume**(): `void`



*Defined in [panel.ts:133](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L133)*



Resumes the panel




**Returns:** `void`





___

<a id="stop"></a>

###  stop

► **stop**(): `void`



*Defined in [panel.ts:124](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L124)*



Stops the panel




**Returns:** `void`





___


