import { LedMatrix } from "../../src/lib/led-matrix";

const ledMatrix = new LedMatrix({
  pathCharacters: "customAlphabet.json",
  input: "(smiley)"
});

ledMatrix.init(1, () => {
  ledMatrix.play();
});