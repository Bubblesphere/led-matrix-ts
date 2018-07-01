import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import { Alphabet } from '../../lib/characterArray/alphabet';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import VerticalScrollingPanel from '../../lib/panels/vertical-scrolling-panel';
import { CanvaRenderers } from '../../lib/rendering/canva-renderers';

const board = new Board();
const boardVertical = new Board();
const dictionary = new CharacterDictionary(Alphabet);

// input your customized message which can be changed at any time
board.load("HORIZONTAL ", dictionary);

const sideScrollingPanel = new SideScrollingPanel({
  board: board,
  renderer: new CanvaRenderers.Rect({
    canva: document.getElementById("side-scrolling-panel") as HTMLCanvasElement
  })
});

boardVertical.load("VERTICAL", dictionary);

const verticalScrollingPanel = new VerticalScrollingPanel({
  board: boardVertical,
  renderer: new CanvaRenderers.Rect({
    canva: document.getElementById("vertical-scrolling-panel") as HTMLCanvasElement
  })
});

verticalScrollingPanel.ReachingBoundary.on((parameters) => {
  verticalScrollingPanel.pause();
  setTimeout(() => {
    verticalScrollingPanel.play();
  }, 500)
})


sideScrollingPanel.play();
verticalScrollingPanel.play();