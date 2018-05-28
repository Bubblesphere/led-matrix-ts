import Board from '../../lib/board';
import Panel from '../../lib/panel';
import Character from '../../lib/character';
import CharacterDictionary from '../../lib/character-dictionary';
import SideScrollingPanel from '../../lib/scrolling/side-scrolling-panel';
import { Alphabet } from '../../lib/characterArray/alphabet';
import CanvaRenderer, { CanvaRendererShape } from '../../lib/appearance/canva-renderer';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

board.load("HELLO WORLD ", dictionary);

const renderer = new CanvaRenderer({
  canva: document.getElementById("digital-canva") as HTMLCanvasElement
})

const renderer2 = new CanvaRenderer({
  canva: document.getElementById("digital-canva-2") as HTMLCanvasElement,
  shape: CanvaRendererShape.Circle
})

const panel = new SideScrollingPanel({
  board: board,
  renderer: renderer,
  fps: 10
});

const panel2 = new SideScrollingPanel({
  board: board,
  renderer: renderer2,
  fps: 10
});

panel.PanelUpdate.on((parameters) => {
  //
})

panel.play();
panel2.play();