/*import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import { CanvaRenderers } from '../../lib/rendering/canva-renderers';
import BitArray from '../../lib/bit-array';
import { ICharacterArray } from '../../lib/types';
import Character from '../../lib/character';


const sprites: ICharacterArray = [
  new Character(
    ['1'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,0]),
    7
  ),
  new Character(
    ['2'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1]),
    7
  ),
  new Character(
    ['3'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1,1,0,1,0,0,0,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,0,1,1,0,1,1]),
    7
  ),
  new Character(
    ['4'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,0,1,1,1]),
    7
  ),
  new Character(
    ['5'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1]),
    7
  ),
  new Character(
    ['6'], 
    new BitArray([1,1,0,0,0,1,1,1,0,1,1,1,0,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0,1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,1,1,0,1,1,0,1,1,1,0,1]),
    7
  )
];

const board = new Board(0);

const dictionary = new CharacterDictionary([sprites]);

// input your customized message which can be changed at any time
board.load("123456", dictionary);

const sideScrollingPanel = new SideScrollingPanel({
  board: board,
  width: 7,
  height: 11,
  renderer: new CanvaRenderers.Rect({
    canva: document.getElementById("side-scrolling-panel") as HTMLCanvasElement
  })
});

sideScrollingPanel.pause();

let i = 0;

setInterval(function(){ 
  i = (i + 1) % 6;
  sideScrollingPanel.seek(i*7); 
}, 100);
*/