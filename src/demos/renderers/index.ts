import Board from '../../lib/board';
import Panel from '../../lib/panel';
import Character from '../../lib/character';
import CharacterDictionary from '../../lib/character-dictionary';
import SideScrollingPanel from '../../lib/scrolling/side-scrolling-panel';
import { Alphabet } from '../../lib/characterArray/alphabet';
import { CanvaRenderers } from '../../lib/rendering/canva-renderers';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

board.load("Hello WORLD ", dictionary);

const asciiRenderer = new AsciiRenderer({
  element: document.getElementById("ascii-renderer"),
  characterBitOn: 'X', // Default: 'X'
  characterBitOff: ' ' // Default: ' '
})

const asciiAdvancedRenderer = new AsciiRenderer({
  element: document.getElementById("ascii-renderer"),
  characterBitOn: '.', // Default: 'X'
  characterBitOff: ' ' // Default: ' '
})

const rectRenderer = new CanvaRenderers.Rect({
  canva: document.getElementById("rect-renderer") as HTMLCanvasElement
})

const ellipseRederer = new CanvaRenderers.Ellipse({
  canva: document.getElementById("ellipse-renderer") as HTMLCanvasElement,
  colorBitOn: '#9B59B6',
  colorBitOff: '#DADFE1',
  colorStroke: '#674172' 
})

const panelAsciiRenderer = new SideScrollingPanel({
  board: board,
  renderer: asciiRenderer,
  fps: 10
});

const panelAsciiAdvancedRenderer = new SideScrollingPanel({
  board: board,
  renderer: asciiRenderer,
  fps: 10
});

const panelRectRenderer = new SideScrollingPanel({
  board: board,
  renderer: rectRenderer,
  fps: 10
});

const panelEllipseRenderer = new SideScrollingPanel({
  board: board,
  renderer: ellipseRederer,
  fps: 10
});

panelAsciiRenderer.play();
panelAsciiAdvancedRenderer.play();
panelRectRenderer.play();
panelEllipseRenderer.play();