import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import { Alphabet } from '../../lib/characterArray/alphabet';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import VerticalScrollingPanel from '../../lib/panels/vertical-scrolling-panel';

const board = new Board();
const dictionary = new CharacterDictionary([Alphabet]);

// input your customized message which can be changed at any time
board.load("Hello World ", dictionary);

const panel = new SideScrollingPanel({
  board: board,
  renderer: new AsciiRenderer({
    element: document.getElementById("root"),
    characterBitOn: 'X',
    characterBitOff: '-'
  })
});

panel.PanelUpdate.on((parameters) => {

})

panel.play();