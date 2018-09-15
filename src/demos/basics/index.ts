import Board from '../../lib/board';
import CharacterDictionary from '../../lib/alphabet';
// import your own font
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import AlphabetJSON from '../../lib/alphabet-json';

AlphabetJSON.import("test.json", (characters) => {
  const board = new Board();
  const dictionary = new CharacterDictionary();

  dictionary.add(characters);

  // input your customized message which can be changed at any time
  board.load("ABC", dictionary);

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
});



