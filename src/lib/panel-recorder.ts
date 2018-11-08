import { Panel } from "./panel";
import { PanelFrame } from "./types";


export class PanelRecorder {
  static getSequence(panel: Panel): PanelFrame[] {
    let sequence = [];

    panel.PanelUpdate.on((panelFrame) => {
      sequence.push(panelFrame.display);
    });

    let prevIndex = panel.index;
    let i = 0;
    panel.seek(0);
    for (let i = 0; i <= panel.indexUpperBound; i++) {
      panel.tick();
    }
    panel.seek(prevIndex);

    return sequence;
  }
}