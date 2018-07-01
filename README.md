# led-matrix-ts
A library for simulating an LED matrix panel in the browser. The library offers a maximum of flexibility for the developer to do just about anything to it's panel. Whether you want to add a font, a scrolling sequence or/and customize the appareance, you can.


- [Installation](#installation)
- [Basics](#basics)
- [API](#api)
  * [Character Dictionary](#character-dictionary)
  * [Board](#board)
  * [Panel](#panel)
  * [Renderers](#renderers)
- [License](#license)

![Demo gif](https://i.imgur.com/bT8uZPN.gif)
![Demo gif 2](https://i.imgur.com/08NQXUR.gif)

## Size
12.97 KB

2.96 KB (Gzipped)

## Installation
**via npm**

`npm install led-matrix-ts`

**via yarn**

`yarn add led-matrix-ts`

**dev**

`npm install`

`yarn install`

`yarn start`


## Basics
**Check out `src/demos/basics` for more details**

**html**

```html
<html>
  <head>
    <title>led-matrix-ts</title>
  </head>
  <body>
    <div id="root  style="font-family: monospace; white-space: pre;""></div>
  </body>
</html>
```

**ts**


```typescript
import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import { Alphabet } from '../../lib/characterArray/alphabet';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/scrolling/side-scrolling-panel';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

// input your customized message which can be changed at any time
board.load("HELLO WORLD ", dictionary);

const panel = new SideScrollingPanel({
  board: board,
  renderer: new AsciiRenderer({
    element: document.getElementById("root")
  })
});

panel.play();
```
---

## API

- [Character Dictionary](#character-dictionary)
- [Board](#board)
- [Panel](#panel)
- [Renderers](#renderers)

---

### character-dictionary
The character dictionnary contains the matrix representation of the different characters available. You can create your own alphabet and pass it to the constructor of the character dictionnary.

#### Create your own alphabet
**Demo: Check out `src/demos/alphabet` for more details**

```typescript
      const Alphabet: ICharacterArray = [
        new Character(
          ['s', 'S'], 
          new BitArray([0, 0, 1, 1, 1, 1, 1, 0, 0,
                        0, 1, 0, 0, 0, 0, 0, 1, 0,
                        1, 0, 0, 1, 0, 1, 0, 0, 1,
                        1, 0, 0, 0, 0, 0, 0, 0, 1,
                        1, 0, 1, 0, 0, 0, 1, 0, 1,
                        1, 0, 0, 1, 1, 1, 0, 0, 1,
                        0, 1, 0, 0, 0, 0, 0, 1, 0,
                        0, 0, 1, 1, 1, 1, 1, 0, 0]),
          9
        )
      ];
      
      const board = new Board();
      const dictionary = new CharacterDictionary(Alphabet);
      board.load("S", dictionary);
```
![Custom Alphabet](https://i.imgur.com/6RypEMT.gif)

---

### Board
The board creates the link between the dictionnary and the input. It's role is to create the matrix reprentation of the entire board

#### Method
Method | Description
--- | ---
**`load(input: String, dictionnary: CharacterDictionary)`** | Stiches up the different characters of the dictionnary based on the input onto the board.

NB: Actual representation is in the form of a 0/1 matrix. Used black/white squares for visualization purposes only.
**Empty board**
![Empty board](https://i.imgur.com/GTP4tFm.png)
**Loaded board**
![Loaded board](https://i.imgur.com/cQbTJzz.png)

---

### Panel
The panel deals with the displaying logic. You can see it as a viewport moving through a board. It has control over starting, stopping, pausing, resuming and seeking. 

### Choose between
**Demo: Check out `src/demos/panels` for more details**
##### Side scrolling panel
``` typescript
const sideScrollingPanel = new SideScrollingPanel({
  ...
});
```
![Horizontal scrolling](https://i.imgur.com/hajLuk3.gif)
##### Vertical scrolling panel
``` typescript
const verticalScrollingPanel = new VerticalScrollingPanel({
  ...
});
```
![Vertical scrolling](https://i.imgur.com/WGCbCES.gif)

##### Make your own
To implement your own scrolling logic, extend the Panel abstract class situated at `src/lib/panel`.

#### Parameters
Parameters | Default | Description 
--- | --- | ---
**`board: Board`** |  | The board upon which the panel should be hooked up
**`renderer: Renderer`** |  | The panel renderer
**`fps: number`** | 24 | The amount of updates to the panel per second
**`height: number`** | 8 | The height of the viewport
**`width: number`** | 60 | The width of the viewport
**`reverse: boolean`** | false | Whether the scrolling sequence should be reversed

#### Methods
Method | Description
--- | --- 
**`play()`** | Places the panel at the begining of the board and starts moving at the the fps speed.
**`pause()`** | Pauses the panel at the current position.
**`resume()`** | Resumes the panel at the current position.
**`stop()`** | Places the panel at the begining of the board and stops it.
**`seek(frame: number)`** | Seek the panel to the specified position

**Demo: Check out `src/demos/controls` for more details**

#### Events 
Easily hook and customize and event by passing an object of events to the events method of the panel.

**Demo: Check out `src/demos/events` for more details**

Event | Description
--- | --- 
**`PanelUpdate: (display: PanelDisplay) => void`** | Every time the panel gets updated, this event is triggered. The display variable contains an array of array of bits. This method is where you'd customize how the panel is rendered on the screen.
**`PanelUpdateBit: (x: number, y: number, value: Bit) => void`** | Similar to PanelUpdate but triggers the event for every bit of every panel update.
**`ReachingBoundary: () => void`** | Triggered everytime the board loops

**Here the panel moves through 4 panel updates before the gif restarts**
NB: Actual representation is in the form of a 0/1 matrix. Used black/white squares for visualization purposes only.
![Moving Panel](https://i.imgur.com/8irA5GI.gif)

---

### Renderers

#### AsciiRenderer
Parameters | Default | Description 
--- | --- | ---
**`element: HTMLElement`** |  | The element upon which its rendered
**`characterBitOn?: string`** | "X" | The character corresponding to the on state bits
**`characterBitOff?: string`** | " " | The character corresponding to the off state bits
#### CanvaRenderer (Abstract)
Parameters | Default | Description 
--- | --- | ---
**`canva: HTMLCanvasElement`** |  | The canva upon which its rendered
**`colorBitOn?: string`** | "#00B16A" | The color corresponding to the on state bits
**`colorBitOff?: string`** | "#22313F"  | The color corresponding to the off state bits
**`colorStroke?: string`** | "#67809F" | The color of the stroke around each bit

#### Usage
**Demo: Check out `src/demos/renderers` for more details**
##### AsciiRenderer
```typescript
const asciiRenderer: AsciiRenderer = new AsciiRenderer({
  element: document.getElementById("ascii-renderer")
})
```
![AsciiRenderer](https://i.imgur.com/IuZtYEc.gif)

##### CanvaRenderer.Rect
```typescript
const rectRenderer = new CanvaRenderers.Rect({
  canva: document.getElementById("rect-renderer") as HTMLCanvasElement
})
```
![CanvaRenderer.Rect](https://i.imgur.com/VPdCATD.gif)

##### CanvaRenderer.Ellipse
```typescript
const ellipseRederer = new CanvaRenderers.Ellipse({
  canva: document.getElementById("ellipse-renderer") as HTMLCanvasElement
  colorBitOn: '#9B59B6',
  colorBitOff: '#67809F',
  colorStroke: '#5C97BF' 
})
```
![CanvaRenderer.Ellipse](https://i.imgur.com/IPVDphn.gif)

##### Make your own
To implement your own renderer, extend the Renderer abstract class situated at `src/lib/rendering/renderer`.

---

## License
```
Copyright (c) 2018 Bubblesphere


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
