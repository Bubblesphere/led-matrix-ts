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