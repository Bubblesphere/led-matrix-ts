import LedMatrix from '../../lib/led-matrix';


const ledMatrix = new LedMatrix({
  input: "ABC",
  options: {
    board: {
      spacing: 6,
      padding: [0, 6, 0, 0]
    }
  }
});