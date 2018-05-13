# led-matrix-ts
A library for simulating an LED matrix panel in the browser. The library offers a maximum of flexibility for the developer to do just about anything to it's panel. Whether you want to add a font, a scrolling sequence or/and customize the appareance, you can.

**Check out `src/demos/basics` for more details**

![Demo gif](https://i.imgur.com/bT8uZPN.gif)

**Check out `src/demos/customizeAppearance` for more details**

![Demo gif 2](https://i.imgur.com/08NQXUR.gif)

## Installation
**via npm**

`npm install led-matrix-ts`

**via yarn**

`yarn add led-matrix-ts`

**dev**

`npm install`

`yarn install`

`yarn start`


## Basic usage

**html**

```html
<html>
  <head>
    <title>led-matrix-ts</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**ts**


```typescript
import Board from './board';
import Panel from './panel';
import Character from './character';
import CharacterDictionary from './character-dictionary';
// import your own font
import { Alphabet } from './alphabet';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

// input your customized message which can be changed at any time
board.load("HELLO WORLD ", dictionary);

const panel = new Panel(board);

// create your own appearance
const myCustomAppearance = (display: any) => {
    let output = "";
    for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          output += display[i][j] == 1 ? "X" : " ";
        }
      output += '\n';
    }
    document.getElementById("root").innerHTML = output; 
}

panel.events({
  onPanelUpdate: (display) => { 
    myCustomAppearance(display);
  },
});

panel.play();
```

## Concepts
### Character Dictionnary
The character dictionnary contains the matrix representation of the different characters available. You can create your own alphabet and pass it to the constructor of the character dictionnary.
### Board
The board creates the link between the dictionnary and the input. It's role is to create the matrix reprentation of the entire board

#### Method
Method | Description
--- | ---
**`load(input: String, dictionnary: CharacterDictionary)`** | Stiches up the different characters of the dictionnary based on the input onto the board.


### Panel
The panel deals with the displaying logic. You can see it as a viewport moving through a board. It has control over starting, stopping, pausing and resuming.



#### Parameters
Parameters | Default | Description 
--- | --- | ---
**`board`** |  | The board upon which the panel should be hooked up
**`fps`** | 24 | The amount of updates to the panel per second
**`height`** | 8 | The height of the viewport
**`width`** | 60 | The width of the viewport

#### Methods
Method | Description
--- | --- 
**`play()`** | Places the panel at the begining of the board and starts moving at the the fps speed.
**`pause()`** | Pauses the panel at the current position.
**`resume()`** | Resumes the panel at the current position.
**`stop()`** | Places the panel at the begining of the board and stops it.

#### Events 
Easily hook and customize and event by passing an object of events to the events method of the panel.

Event | Description
--- | --- 
**`OnPanelUpdate: (display) => void`** | Every time the panel gets updated, this event is triggered. The display variable contains an array of array of bits. This method is where you'd customize how the panel is rendered on the screen.
**`onPanelUpdateBit: (display) => void`** | Similar to OnPnaleUpdate but triggers the event for every bit of every panel update.

## Visualizing concepts
**Empty board**
![Empty board](https://i.imgur.com/GTP4tFm.png)
**Loaded board**
![Loaded board](https://i.imgur.com/cQbTJzz.png)
**Here the panel moves through 4 panel updates before the gif restarts**
![Moving Panel](https://i.imgur.com/8irA5GI.gif)

## Create your own alphabet
Check out `src/fonts/alphabet.ts` for details of how to create your own alphabet.

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
