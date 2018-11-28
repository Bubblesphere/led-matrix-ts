import { LedMatrix } from "../../src/lib/core/led-matrix";
import { CharactersJSON } from "../../src/lib/core/character-json";
import { LedMatrixPlayer } from "../player/led-matrix-player";
import { AsciiRenderer } from "../player/rendering/ascii-renderer";

const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer(null, {
  fps: 30,
  renderer: new AsciiRenderer({
    characterBitOff: ' ',
    characterBitOn: 'X',
    elementId: "led-matrix"
  })
});
let init = true;


CharactersJSON.import("customAlphabet.json", (characters) => {
  ledMatrix.addCharacters(characters);
  ledMatrix.input = "(smiley)";
  ledMatrix.sequence.then((sequence) => {
    player.sequence = sequence;
    player.play();
  })
  ledMatrix.event.newSequence.on((sequence) => {
    player.sequence = sequence
  })
});

