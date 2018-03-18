import Board from './board';
import ScrollingMatrix from './scrolling-matrix';
import Character from './character';
import CharacterDictionary from './character-dictionary';

const board = new Board(2);
const matrix = new ScrollingMatrix();

const characters = [
  new Character(['a', 'A'], [
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1]
  ]),
  new Character(['b', 'B'], [
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1]
  ]),
];

const dictionary = new CharacterDictionary(characters);

board.load("aaa", dictionary);


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