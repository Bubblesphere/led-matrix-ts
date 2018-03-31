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

const panel = new Panel({
  board: board,
  // fps: 24,
  // height: 8,
  // width: 60,
});

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

/*
setTimeout(function(){ panel.pause() }, 3000);
setTimeout(function(){ panel.resume() }, 4000);
setTimeout(function(){ board.load("a", dictionary); }, 4500);
setTimeout(function(){ panel.stop() }, 6000);
setTimeout(function(){ panel.play() }, 7000);
*/