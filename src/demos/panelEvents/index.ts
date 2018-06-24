import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import { Alphabet } from '../../lib/characterArray/alphabet';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

// input your customized message which can be changed at any time
board.load("HELLO WORLD ", dictionary);

const panel = new SideScrollingPanel({
  board: board,
  renderer: new AsciiRenderer({
    element: document.getElementById("root")
  })
});

panel.PanelUpdate.on((parameters) => {
  const formattedDisplay = parameters.display.toString().replace(/,/g, '');
  document.getElementById("panel-update").innerHTML = formattedDisplay;
});

panel.PanelUpdateBit.on((parameters) => {
  document.getElementById("panel-update-bit").innerHTML = `Position ${parameters.x},${parameters.y} updated to value ${parameters.value}`;
});

panel.ReachingBoundary.on((parameters) => {
  document.getElementById("reaching-boundary").innerHTML = `${document.getElementById("reaching-boundary").innerHTML}X`;
});

panel.play();