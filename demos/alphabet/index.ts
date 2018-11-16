import { LedMatrix } from "../../src/lib/led-matrix";
import { CharactersJSON } from "../../src/lib/character-json";

const ledMatrix = new LedMatrix();

CharactersJSON.import("customAlphabet.json", (characters) => {
  ledMatrix.addCharacters(characters);
  ledMatrix.input = "(smiley)";
  ledMatrix.play();
});


