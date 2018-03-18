import Board from './board';
import ScrollingMatrix from './scrolling-matrix';
import Character from './character';
import CharacterDictionary from './character-dictionary';
import { Alphabet } from './alphabet';

const board = new Board(2);
const matrix = new ScrollingMatrix();
const dictionary = new CharacterDictionary(Alphabet);

board.load("abcdefghij", dictionary);

matrix.loop({
  board: board, 
  callbackDone: (display) => { 
    let output = "";
    for(var i = 0; i < display.length; i++) {
        for(var j = 0; j < display[i].length; j++) {
          output += display[i][j] == 1 ? "X" : " ";
        }
      output += '\n';
    }
    document.getElementById("root").innerHTML = output; 
  }
});