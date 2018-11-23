
import SideScrollingPanel from "./side-scrolling-panel";
import VerticalScrollingPanel from "./vertical-scrolling-panel";
import { PanelParameters, Panel } from "../panel";
import { PanelFrame } from "../../types";

export enum ScrollerType {
    SideScrollingPanel,
    VerticalScrollingPanel
}

export class ScrollerBuilder {
    static build(scrollerType: ScrollerType) : Scroller {
        switch(scrollerType) {
            case ScrollerType.SideScrollingPanel:
                return new SideScrollingPanel();
            case ScrollerType.VerticalScrollingPanel:
                return new VerticalScrollingPanel();
        }
    }
}

export interface Scroller {
    indexUpperBound(a: PanelParameters): number;
    generatePanelFrameAtIndex(a: number, b: PanelParameters): PanelFrame
  }