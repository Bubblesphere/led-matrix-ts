import { Panel, PanelParameters } from "./panel";
import { SideScrollingPanel } from "./panels/side-scrolling-panel";
import { VerticalScrollingPanel } from "./panels/vertical-scrolling-panel";

export enum PanelType {
    SideScrollingPanel,
    VerticalScrollingPanel
}

export class PanelBuilder {
    static build(panelType: PanelType, params: PanelParameters) : Panel {
        switch(panelType) {
            case PanelType.SideScrollingPanel:
                return new SideScrollingPanel(params);
            case PanelType.VerticalScrollingPanel:
                return new VerticalScrollingPanel(params);
        }
    }
}