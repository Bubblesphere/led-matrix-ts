
import { PanelParameters } from "../panel";
import { PanelFrame } from "../../types";

export interface Scroller {
    /** The index at which the scroller has done a loop */
    loopEndIndex(a: PanelParameters): number;
    /** Generates the PanelFrame at an index of   */
    generatePanelFrameAtIndex(a: number, b: PanelParameters): PanelFrame
  }