import Board from '../../lib/board';
import CharacterDictionary from '../../lib/character-dictionary';
// import your own font
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import SideScrollingPanel from '../../lib/panels/side-scrolling-panel';
import CharactersParser from '../../lib/character/characters-parser';

const board = new Board();
const customJSON = new CharactersParser();
// -------------------
var rawFile = new XMLHttpRequest();
rawFile.open("GET", "test.json", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4) {
        if(rawFile.status === 200 || rawFile.status == 0) {
            var value = rawFile.responseText;
            
            // ++++++

            const dictionary = new CharacterDictionary([customJSON.parse(value)]);

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

            // ++++++

        }
    }
}
rawFile.send(null);
// -------------------

