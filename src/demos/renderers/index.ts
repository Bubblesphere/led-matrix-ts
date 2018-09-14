/*import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
import { CanvaRenderers } from '../../lib/rendering/canva-renderers';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import CharactersParser from '../../lib/character/characters-parser';
import '../../lib/character/test.json';

const board = new Board();
const customJSON = new CharactersParser();
const dictionary = new CharacterDictionary([customJSON.parse("")]);

board.load("Hello WORLD ", dictionary);

const asciiRenderer = new AsciiRenderer({
  element: document.getElementById("ascii-renderer"),
  characterBitOn: 'X', // Default: 'X'
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
});

const panelAsciiAdvancedRenderer = new SideScrollingPanel({
  board: board,
  renderer: asciiRenderer,
});

const panelRectRenderer = new SideScrollingPanel({
  board: board,
  renderer: rectRenderer,
});

const panelEllipseRenderer = new SideScrollingPanel({
  board: board,
  renderer: ellipseRederer,
});

panelAsciiRenderer.play();
panelAsciiAdvancedRenderer.play();
panelRectRenderer.play();
panelEllipseRenderer.play();
*/