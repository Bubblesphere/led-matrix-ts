# led-matrix-ts
A library for simulating an LED matrix panel in the browser. The library offers a maximum of flexibility for the developer to do just about anything to it's panel. Whether you want to add a font, a scrolling sequence or/and customize the appareance, you can.

## Basic usage

**Output**

![Demo gif](https://i.imgur.com/bT8uZPN.gif)

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
  /*
  onPanelUpdateBit: (x, y, value) => {

  }
  */
});

panel.play();
// panel.pause()
// panel.resume()
// panel.stop()
```

## Installation
**via npm**

`npm install led-matrix-ts`

**via yarn**

`yarn add led-matrix-ts`

**dev**

`npm install`

`yarn install`

`yarn start`

## API
led-matrix-ts is not production ready. The documentation will be updated upon release.
