import Board from '../../lib/board';
import Panel from '../../lib/panel';
import Character from '../../lib/character';
import CharacterDictionary from '../../lib/character-dictionary';
import { Alphabet } from '../../fonts/alphabet';

const canva = document.getElementById("myCanvas") as HTMLCanvasElement
const ctx = canva.getContext("2d");

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

board.load("HELLO WORLD ", dictionary);

const panel = new Panel({
  board: board,
  fps: 10
});

const canvaAppearance = (display: any) => {
  for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        ctx.beginPath();
        ctx.fillStyle= display[i][j] == 1 ? "#00B16A" : "#22313F";
        ctx.rect(j*40, i*40, 40, 40);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#67809F";
        ctx.stroke();
      }
  }
};

panel.events({
  onPanelUpdate: (display) => { 
    canvaAppearance(display);
  }
});

panel.play();