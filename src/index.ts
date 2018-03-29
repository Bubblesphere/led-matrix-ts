import Board from './board';
import ScrollingMatrix from './scrolling-matrix';
import Character from './character';
import CharacterDictionary from './character-dictionary';
import BitArray from './bit-array';
import { Alphabet } from './alphabet';

const board = new Board(2);
const dictionary = new CharacterDictionary(Alphabet);

board.load("abcdefghijklmnopqrstuvwxyz", dictionary);

const matrix = new ScrollingMatrix(board);
matrix.stepParameters({  
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

matrix.play();

setTimeout(function(){ matrix.pause() }, 3000);
setTimeout(function(){ matrix.resume() }, 4000);
setTimeout(function(){ board.load("a", dictionary); }, 4500);
setTimeout(function(){ matrix.stop() }, 6000);
setTimeout(function(){ matrix.play() }, 7000);
