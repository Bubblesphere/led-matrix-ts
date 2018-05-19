import { PanelRenderer, bit } from "../../lib/types";

const AsciiRenderer: PanelRenderer = (display: Array<Array<bit>>) => {
  let output = "";
  for(var i = 0; i < display.length; i++) {
      for(var j = 0; j < display[i].length; j++) {
        output += display[i][j] == 1 ? "X" : " ";
      }
    output += '\n';
  }
  document.getElementById("root").innerHTML = output; 
};

export default AsciiRenderer;