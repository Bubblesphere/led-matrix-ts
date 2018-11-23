import { LedMatrix } from '../../src/lib/core/led-matrix';
import AsciiRenderer from '../../src/lib/player/rendering/ascii-renderer';
import { CanvaRenderers } from '../../src/lib/player/rendering/canva-renderers';
import { CharactersJSON } from '../../src/lib/core/character-json';
import { LedMatrixPlayer } from '../../src/lib/player/led-matrix-player';
import SideScrollingPanel from '../../src/lib/core/scrollers/side-scrolling-panel';
import VerticalScrollingPanel from '../../src/lib/core/scrollers/vertical-scrolling-panel';


const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer(ledMatrix.sequence);

ledMatrix.event.newSequence.on((params) => {
    player.sequence = params.sequence
})

CharactersJSON.import("alphabett.json", (characters) => {
  ledMatrix.addCharacters(characters);
  player.play();
});


document.getElementById("input-button").addEventListener("click", (e) => {
  const value = (document.getElementById("input-value") as HTMLInputElement).value;
  ledMatrix.input = value;
});

document.getElementById("size-button").addEventListener("click", (e) => {
  const value = (document.getElementById("size-value") as HTMLInputElement).value;
  ledMatrix.size = Number(value);
});

document.getElementById("spacing-button").addEventListener("click", (e) => {
  const value = (document.getElementById("spacing-value") as HTMLInputElement).value;
  ledMatrix.spacing = Number(value);
});

document.getElementById("padding-button").addEventListener("click", (e) => {
  const value = (document.getElementById("padding-value") as HTMLInputElement).value;
  const padding = value.split(",").map(x => Number(x));
  ledMatrix.padding = [padding[0], padding[1], padding[2], padding[3]];
});

document.getElementById("play-button").addEventListener("click", (e) => {
  player.play();
});

document.getElementById("stop-button").addEventListener("click", (e) => {
  player.stop();
});

document.getElementById("resume-button").addEventListener("click", (e) => {
  player.resume();
});

document.getElementById("pause-button").addEventListener("click", (e) => {
  player.pause();
});

document.getElementById("tick-button").addEventListener("click", (e) => {
  player.step();
});

document.getElementById("seek-button").addEventListener("click", (e) => {
  const value = (document.getElementById("seek-value") as HTMLInputElement).value;
  player.seek(Number(value));
});

document.getElementById("fps-button").addEventListener("click", (e) => {
  const value = (document.getElementById("fps-value") as HTMLInputElement).value;
  player.fps = Number(value);
});

document.getElementById("increment-button").addEventListener("click", (e) => {
  const value = (document.getElementById("increment-value") as HTMLInputElement).value;
  ledMatrix.increment = Number(value);
});

document.getElementById("viewportWidth-button").addEventListener("click", (e) => {
  const value = (document.getElementById("viewportWidth-value") as HTMLInputElement).value;
  ledMatrix.viewportWidth = Number(value);
});

document.getElementById("reverse-checkbox").addEventListener("click", (e) => {
  const value = (document.getElementById("reverse-checkbox") as HTMLInputElement).checked;
  ledMatrix.reverse = Boolean(value);
});

document.getElementById("panelType-select").addEventListener("click", (e) => {
  const value = (document.getElementById("panelType-select") as HTMLInputElement).value;
  switch (value) {
    case "SideScrollingPanel":
      ledMatrix.scroller = new SideScrollingPanel();
      break;
    case "VerticalScrollingPanel":
      ledMatrix.scroller = new VerticalScrollingPanel();
      break;
  }
});

document.getElementById("renderer-select").addEventListener("click", (e) => {
  const value = (document.getElementById("renderer-select") as HTMLInputElement).value;
  switch (value) {
    case "AsciiRenderer":
      document.getElementById("led-matrix-canvas").hidden = true;
      document.getElementById("led-matrix").hidden = false;
      player.renderer = new AsciiRenderer({
        elementId: 'led-matrix',
        characterBitOn: 'X',
        characterBitOff: ' '
      });
      break;
    case "Rect":
      document.getElementById("led-matrix-canvas").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      player.renderer = new CanvaRenderers.Rect({
        elementId: 'led-matrix-canvas',
      })
      break;
    case "Ellipse":
      document.getElementById("led-matrix-canvas").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      player.renderer = new CanvaRenderers.Ellipse({
        elementId: 'led-matrix-canvas',
        colorBitOn: '#e74c3c',
        colorBitOff: '#ecf0f1',
        colorStrokeOn: '#c0392b',
        colorStrokeOff: '#bdc3c7' 
      });
      break;
  }
});