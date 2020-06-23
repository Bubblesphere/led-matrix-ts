import { LedMatrix } from "../../src/lib/core/led-matrix";
import { CharactersJSON } from "../../src/lib/core/character-json";
import { LedMatrixPlayer } from '../../src/lib/core/player/led-matrix-player';

const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer();

ledMatrix.event.newSequence.on((sequence) => {
  player.sequence = sequence;
})

CharactersJSON.import("customAlphabet.json", (characters) => {
  ledMatrix.addCharacters(characters);
  ledMatrix.input = "(smiley)";
});



