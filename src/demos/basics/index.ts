import Board from '../../lib/board';
import CharacterDictionary from '../../lib/alphabet-searcher';
// import your own font
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import AlphabetJSONParser from '../../lib/alphabet-json';

AlphabetJSONParser.load("test.json", (content) => {
  const board = new Board();

  const dictionary = new CharacterDictionary([AlphabetJSONParser.parse(content)]);

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



