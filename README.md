# led-matrix-ts
A library for simulating an LED matrix panel in the browser. The library offers a maximum of flexibility for the developer to do just about anything to it's panel. Whether you want to add custom characters, a scrolling sequence or/and customize the appareance, you can.


- [Installation](#installation)
- [Basics](#basics)
- [API](#api)
  * [Led Matrix](#ledmatrix)
    * [Use your own alphabet](#customAlphabet)
    * [Padding](#padding)
    * [Panel Type](#paneltype)
    * [Renderer](#renderer)
- [Concepts](#concepts)
  * [Character Dictionary](#characterdictionary)
  * [Board](#board)
  * [Panel](#panel)
- [License](#license)

![Demo gif](https://i.imgur.com/bT8uZPN.gif)
![Demo gif 2](https://i.imgur.com/08NQXUR.gif)

## Size
18.31 KB

4.08 KB (Gzipped)

---

## Installation
**via npm**

`npm install led-matrix-ts`

**via yarn**

`yarn add led-matrix-ts`

**dev**

`npm install` 

`yarn install` 

`yarn start`

---

## Basics
**Check out `src/demos/basics` for more details**

**html**

```html
<html>
  <head>
    <title>led-matrix-ts</title>
  </head>
  <body>
    <div id="root" style="font-family: monospace; white-space: pre"></div>
  </body>
</html>
```

**ts**
```typescript
const ledMatrix = new LedMatrix();
ledMatrix.init();
```

---

## API
### LedMatrix
**Demo: Check out `src/demos/playground` for more details**
#### Properties / Constructor parameters
Parameters can be set using the constructor and/or properties. If you use the lather, make sure to set the properties within the callback of the `Ready` event.

Parameters | Default | Description 
--- | --- | ---
**`fps?: number`** | `30` | The number of frames per second
**`increment?: number`** | `1` | The incrementation between frames
**`input?: string`** | `"Hello World"` | The input to display on the board
**`padding?: Padding`** | `[0, 4]` | The board's padding. More details below
**`panelType?: PanelType`** | `PanelType.SideScrollingPanel` | The panel's scrolling logic. More details below
**`pathCharacters?: boolean`** | `"alphabet.json"` | The path to the json file containing details about the characters. More details below
**`renderer?: Renderer`** | `8` | The panel renderer
**`reverse?: boolean`** | `false` | Whether the scrolling sequence is reversed
**`spacing?: number`** | `2` | The space between characters on the board
**`width?: number`** | `80` | The width of the viewport

#### Methods
Method | Description
--- | --- 
**`pause()`** | Pauses the panel at the current frame
**`play()`** | Places the panel at the first frame and starts ticking at the the fps speed
**`resume()`** | Resumes the panel at the current frame
**`seek(frame: number)`** | Seek the panel to the specified frame
**`stop()`** | Places the panel at the first frame and stops it
**`tick()`** | Ticks the panel one frame

#### Events
Event | Description
--- | --- 
**`PanelUpdate: (display: PanelDisplay) => void`** | Triggered whenever the panel updates
**`ReachingBoundary: () => void`** | Triggered everytime the board loops
**`Ready: () => void`** | Triggered when the panel is ready

<a name="customAlphabet"></a>

#### Use your own characters 
**Demo: Check out `src/demos/alphabet` for more details**
`customAlphabet.json`
```json
{
    "characters": [
        {
        "patterns": ["[smiley]"],
        "output": [ 0, 0, 1, 1, 1, 1, 1, 0, 0,
                    0, 1, 0, 0, 0, 0, 0, 1, 0,
                    1, 0, 0, 1, 0, 1, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 1, 0, 0, 0, 1, 0, 1,
                    1, 0, 0, 1, 1, 1, 0, 0, 1,
                    0, 1, 0, 0, 0, 0, 0, 1, 0,
                    0, 0, 1, 1, 1, 1, 1, 0, 0],
        "width": 9
        }
    ]
}
```
`index.ts`
```typescript
const ledMatrix = new LedMatrix({
  pathCharacters: "customAlphabet.json",
  input: "[smiley]"
});

ledMatrix.init();
```
![Custom Alphabet](https://i.imgur.com/6RypEMT.gif)


#### Padding
Works in a similar fashion to css padding
```typescript
[0] // top: 0; right: 0; bottom: 0; left: 0;
[0, 1] // top: 0; right: 1; bottom: 0; left: 1;
[0, 1, 2, 3] // top: 0; right: 1; bottom: 2; left: 3;
```

#### PanelType
##### PanelType.SideScrollingPanel
![Horizontal scrolling](https://i.imgur.com/hajLuk3.gif)
##### PanelType.VerticalScrollingPanel
![Vertical scrolling](https://i.imgur.com/WGCbCES.gif)

##### Make your own
To implement your own scrolling logic, extend the Panel abstract class situated at `src/lib/panel`. Then, add the choice to the Panel builder situated at `src/lib/panel-builder`.

#### Renderer

##### AsciiRenderer
Parameters | Default | Description 
--- | --- | ---
**`element: HTMLElement`** |  | The element upon which its rendered
**`characterBitOn?: string`** | "X" | The character corresponding to the on state bits
**`characterBitOff?: string`** | " " | The character corresponding to the off state bits
##### CanvaRenderer (Abstract)
Parameters | Default | Description 
--- | --- | ---
**`canva: HTMLCanvasElement`** |  | The canva upon which its rendered
**`colorBitOn?: string`** | "#00B16A" | The color corresponding to the on state bits
**`colorBitOff?: string`** | "#22313F"  | The color corresponding to the off state bits
**`colorStroke?: string`** | "#67809F" | The color of the stroke around each bit

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

## Concepts

### Board
The board creates the link between the dictionnary and the input. It's role is to create the matrix reprentation of the entire board
NB: Actual representation is in the form of a 0/1 matrix. Used black/white squares for visualization purposes only.
**Empty board**
![Empty board](https://i.imgur.com/GTP4tFm.png)
**Loaded board**
![Loaded board](https://i.imgur.com/cQbTJzz.png)

### Panel
The panel deals with the displaying logic. You can see it as a viewport moving through a board. It has control over starting, stopping, pausing, resuming and seeking. 
**Here the panel moves through 4 panel updates before the gif restarts**
NB: Actual representation is in the form of a 0/1 matrix. Used black/white squares for visualization purposes only.
![Moving Panel](https://i.imgur.com/8irA5GI.gif)

### CharacterDictionnary
The character dictionnary contains the matrix representation of the different characters available.

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
