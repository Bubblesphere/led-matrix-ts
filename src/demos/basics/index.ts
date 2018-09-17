import LedMatrix from '../../lib/led-matrix';


const ledMatrix = new LedMatrix();
ledMatrix.init({
  input: "ABCABABC",
  options: {
    board: {
      spacing: 6,
      padding: [0, 6, 0, 0]
    }
  }
}, () => {
  ledMatrix.event.panelUpdate.on((param) => {
    console.log("update");
  });
})


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

/*
panelType: PanelType.SideScrollingPanel,
renderer: new AsciiRenderer({
  element: document.getElementById("led-matrix"),
  characterBitOn: 'X',
  characterBitOff: ' '
}),
reverse: false
*/