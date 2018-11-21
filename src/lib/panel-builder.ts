import { PanelPlayer, PanelPlayerParameters } from "./panel-player";
import { SideScrollingPanel } from "./panels/side-scrolling-panel";
import { VerticalScrollingPanel } from "./panels/vertical-scrolling-panel";
import { PanelSequencerParameters } from "./panel-sequencer";

export enum PanelType {
    SideScrollingPanel,
    VerticalScrollingPanel
}

export class PanelBuilder {
    static build(panelType: PanelType, playerParams: PanelPlayerParameters, sequencerParams: PanelSequencerParameters) : PanelPlayer {
        switch(panelType) {
            case PanelType.SideScrollingPanel:
                return new PanelPlayer({
                    fps: playerParams.fps,
                    renderer: playerParams.renderer,
                    panelSequencer: new SideScrollingPanel(sequencerParams)
                });
            case PanelType.VerticalScrollingPanel:
                return new PanelPlayer({
                    fps: playerParams.fps,
                    renderer: playerParams.renderer,
                    panelSequencer: new VerticalScrollingPanel(sequencerParams)
                });
        }
    }
}