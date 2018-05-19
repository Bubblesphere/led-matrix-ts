import Board from '../../lib/board';
import Panel from '../../lib/panel';
import Character from '../../lib/character';
import CharacterDictionary from '../../lib/character-dictionary';
import { Alphabet } from '../../custom/fonts/alphabet';
import SideScrollingPanel from '../../lib/side-scrolling-panel';
import FuturisticRenderer from '../../custom/appearance/futuristic-renderer';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

board.load("HELLO WORLD ", dictionary);

const panel = new SideScrollingPanel({
  board: board,
  fps: 10
});

panel.events({
  onPanelUpdate: FuturisticRenderer
});

panel.play();