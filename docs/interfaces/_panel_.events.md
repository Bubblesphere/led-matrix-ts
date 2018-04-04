[led-matrix-ts](../README.md) > ["panel"](../modules/_panel_.md) > [Events](../interfaces/_panel_.events.md)



# Interface: Events


## Properties
<a id="onpanelupdate"></a>

### «Optional» onPanelUpdate

**●  onPanelUpdate**:  *`function`* 

*Defined in [panel.ts:8](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L8)*



Triggered for every new frame the panel produces

#### Type declaration
►(display: *`Array`.<`Array`.<`number`>>*): `any`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| display | `Array`.<`Array`.<`number`>>   |  - |





**Returns:** `any`






___

<a id="onpanelupdatebit"></a>

### «Optional» onPanelUpdateBit

**●  onPanelUpdateBit**:  *`function`* 

*Defined in [panel.ts:6](https://github.com/Bubblesphere/scrolling-matrix-js/blob/8b20deb/src/lib/panel.ts#L6)*



Triggered for every bit of every new frame the panel produces

#### Type declaration
►(x: *`number`*, y: *`number`*, value: *[bit](../modules/_bit_array_.md#bit)*): `any`



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | `number`   |  - |
| y | `number`   |  - |
| value | [bit](../modules/_bit_array_.md#bit)   |  - |





**Returns:** `any`






___


