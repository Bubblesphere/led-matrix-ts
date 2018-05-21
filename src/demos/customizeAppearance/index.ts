import Board from '../../lib/board';
import Panel from '../../lib/panel';
import Character from '../../lib/character';
import CharacterDictionary from '../../lib/character-dictionary';
import SideScrollingPanel from '../../lib/scrolling/side-scrolling-panel';
import { Alphabet } from '../../lib/characterArray/alphabet';
import DigitalRenderer from '../../lib/appearance/digital-renderer';

const board = new Board();
const dictionary = new CharacterDictionary(Alphabet);

board.load("HELLO WORLD ", dictionary);

const panel = new SideScrollingPanel({
  board: board,
  fps: 10
});

panel.events({
  onPanelUpdate: DigitalRenderer
});

panel.play();