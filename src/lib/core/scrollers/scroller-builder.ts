import { SideScroller } from "./side-scroller";
import { VerticalScroller } from "./vertical-scroller";
import { Scroller } from "./scroller";

export enum ScrollerTypes {
  Side,
  Vertical
}

export class ScrollerBuilder {
  static build(scrollerType: ScrollerTypes, elementId: string): Scroller {
    switch (scrollerType) {
      case ScrollerTypes.Side:
        return new SideScroller();
      case ScrollerTypes.Vertical:
        return new VerticalScroller();
    }
  }
}