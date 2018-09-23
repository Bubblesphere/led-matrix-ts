import LedMatrix from '../../lib/led-matrix';
import { PanelType } from '../../lib/panel-builder';
import AsciiRenderer from '../../lib/rendering/ascii-renderer';
import { CanvaRenderers } from '../../lib/rendering/canva-renderers';


const ledMatrix = new LedMatrix({
  input: "ABCABABC",
  spacing: 6,
  padding: [0, 6, 0, 0]
});

ledMatrix.event.ready.on(() => {
  ledMatrix.input = "test";
  console.log("update");
});

ledMatrix.init();




document.getElementById("input-button").addEventListener("click", (e) => {
  const value = (document.getElementById("input-value") as HTMLInputElement).value;
  ledMatrix.input = value;
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
  ledMatrix.play();
});

document.getElementById("stop-button").addEventListener("click", (e) => {
  ledMatrix.stop();
});

document.getElementById("resume-button").addEventListener("click", (e) => {
  ledMatrix.resume();
});

document.getElementById("pause-button").addEventListener("click", (e) => {
  ledMatrix.pause();
});

document.getElementById("seek-button").addEventListener("click", (e) => {
  const value = (document.getElementById("seek-value") as HTMLInputElement).value;
  ledMatrix.seek(Number(value));
});
document.getElementById("fps-button").addEventListener("click", (e) => {
  const value = (document.getElementById("fps-value") as HTMLInputElement).value;
  ledMatrix.fps = Number(value);
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
      ledMatrix.panelType = PanelType.SideScrollingPanel;
      break;
    case "VerticalScrollingPanel":
      ledMatrix.panelType = PanelType.VerticalScrollingPanel;
      break;
  }
});

document.getElementById("renderer-select").addEventListener("click", (e) => {
  const value = (document.getElementById("renderer-select") as HTMLInputElement).value;
  switch (value) {
    case "AsciiRenderer":
      document.getElementById("led-matrix-canvas").hidden = true;
      document.getElementById("led-matrix").hidden = false;
      ledMatrix.renderer = new AsciiRenderer({
        element: document.getElementById("led-matrix"),
        characterBitOn: 'X',
        characterBitOff: ' '
      });
      break;
    case "Rect":
      document.getElementById("led-matrix-canvas").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      ledMatrix.renderer = new CanvaRenderers.Rect({
        canva: document.getElementById("led-matrix-canvas") as HTMLCanvasElement,
      })
      break;
    case "Ellipse":
      document.getElementById("led-matrix-canvas").hidden = false;
      document.getElementById("led-matrix").hidden = true;
      ledMatrix.renderer = new CanvaRenderers.Ellipse({
        canva: document.getElementById("led-matrix-canvas") as HTMLCanvasElement,
        colorBitOn: '#e74c3c',
        colorBitOff: '#ecf0f1',
        colorStrokeOn: '#c0392b',
        colorStrokeOff: '#bdc3c7' 
      });
      break;
  }
});
/*
renderer: new AsciiRenderer({
  element: document.getElementById("led-matrix"),
  characterBitOn: 'X',
  characterBitOff: ' '
})
*/