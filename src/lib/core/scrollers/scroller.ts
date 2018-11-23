
import { Panel } from "../panel";
import { PanelFrame } from "../../types";

export interface Scroller {
    /** The index at which the scroller has done a loop */
    loopEndIndex(a: Panel): number;
    /** Generates the PanelFrame at an index of   */
    generatePanelFrameAtIndex(a: number, b: Panel): PanelFrame
  }