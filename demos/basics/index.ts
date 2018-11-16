import { LedMatrix } from '../../src/lib/led-matrix';
import { RendererType } from '../../src/lib/renderer-builder';
import { CharactersJSON } from '../../src/lib/character-json';

const ledMatrix = new LedMatrix();
/*ledMatrix.setRendererFromBuilder({
    elementId: 'led-matrix',
    rendererType: RendererType.ASCII
});*/

CharactersJSON.import("alphabet.json", (characters) => {
    ledMatrix.addCharacters(characters);
    ledMatrix.input = "hello world";
    ledMatrix.play();
});
