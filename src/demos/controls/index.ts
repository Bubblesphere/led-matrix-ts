/*import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import { Alphabet } from '../../lib/characterArray/alphabet';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';

const board = new Board();
const dictionary = new CharacterDictionary([Alphabet]);

// input your customized message which can be changed at any time
board.load("HELLO WORLD ", dictionary);

const renderer: AsciiRenderer = new AsciiRenderer({
  element: document.getElementById("root"),
  characterBitOn: "X",
  characterBitOff: " "
})
 
const panel = new SideScrollingPanel({
  board: board,
  renderer: renderer
});

panel.play();

document.getElementById("play").addEventListener("click", (ev) => {
  panel.play();
});

document.getElementById("stop").addEventListener("click", (ev) => {
  panel.stop();
});

document.getElementById("pause").addEventListener("click", (ev) => {
  panel.pause();
});

document.getElementById("resume").addEventListener("click", (ev) => {
  panel.resume();
});

document.getElementById("seek").addEventListener("click", (ev) => {
  panel.seek(Number((document.getElementById("seek-text") as HTMLInputElement).value));
});
*/