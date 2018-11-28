import { LedMatrix } from '../../src/lib/core/led-matrix';
import { CharactersJSON } from '../../src/lib/core/character-json';
import { LedMatrixPlayer } from '../player/led-matrix-player';
import { SideScroller } from '../../src/lib/core/scrollers/side-scroller';
import { VerticalScroller } from '../../src/lib/core/scrollers/vertical-scroller';
import { AsciiRenderer } from '../player/rendering/ascii-renderer';
import { CanvasRenderers } from '../player/rendering/canvas-renderers';

const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer({
  fps: 60,
  renderer: new AsciiRenderer({
    elementId: "led-matrix"
  })
});

ledMatrix.event.newSequence.on((sequence) => {
  player.sequence = sequence;
})

CharactersJSON.import("alphabett.json", (characters) => {
  ledMatrix.addCharacters(characters);
  ledMatrix.input = "hello world";
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
  ledMatrix.letterSpacing = Number(value);
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
      ledMatrix.scroller = new SideScroller();
      break;
    case "VerticalScrollingPanel":
      ledMatrix.scroller = new VerticalScroller();
      break;
  }
});

document.getElementById("renderer-select").addEventListener("click", (e) => {
  const value = (document.getElementById("renderer-select") as HTMLInputElement).value;
  switch (value) {
    case "AsciiRenderer":
      document.getElementById("led-matrix").hidden = true;
      document.getElementById("led-matrix").hidden = false;
      player.renderer = new AsciiRenderer({
        elementId: 'led-matrix',
        characterBitOn: 'X',
        characterBitOff: ' '
      });
      break;
    case "Rect":
      document.getElementById("led-matrix").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      player.renderer = new CanvasRenderers.Rect({
        elementId: 'led-matrix-canvas',
      })
      break;
    case "Ellipse":
      document.getElementById("led-matrix").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      player.renderer = new CanvasRenderers.Ellipse({
        elementId: 'led-matrix-canvas',
        colorBitOn: '#e74c3c',
        colorBitOff: '#ecf0f1',
        colorStrokeOn: '#c0392b',
        colorStrokeOff: '#bdc3c7' 
      });
      break;
  }
});