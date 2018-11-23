
import SideScrollingPanel from "./panels/side-scrolling-panel";
import VerticalScrollingPanel from "./panels/vertical-scrolling-panel";
import { PanelParameters, Panel } from "./panel";

export enum PanelType {
    SideScrollingPanel,
    VerticalScrollingPanel
}

export class PanelBuilder {
    static build(panelType: PanelType, panelParams: PanelParameters) : Panel {
        switch(panelType) {
            case PanelType.SideScrollingPanel:
                return new SideScrollingPanel(panelParams);
            case PanelType.VerticalScrollingPanel:
                return new VerticalScrollingPanel(panelParams);
        }
    }
}