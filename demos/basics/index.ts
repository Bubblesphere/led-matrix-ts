import { LedMatrix } from '../../src/lib/core/led-matrix';
import { CharactersJSON } from '../../src/lib/core/character-json';
import { LedMatrixPlayer } from '../../src/lib/player/led-matrix-player';

const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer(ledMatrix.sequence);

ledMatrix.event.newSequence.on((params) => {
    player.sequence = params.sequence
})

CharactersJSON.import("alphabet.json", (characters) => {
    ledMatrix.addCharacters(characters);
    ledMatrix.input = "hello world";
    player.play();
});
