import LedMatrix from "../../lib/led-matrix";

const ledMatrix = new LedMatrix({
  pathCharacters: "customAlphabet.json",
  input: "[smiley]"
});

ledMatrix.init();