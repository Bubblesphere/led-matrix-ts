import { LedMatrix } from '../../src/lib/led-matrix';
import { RendererType } from '../../src/lib/renderer-builder';

const ledMatrix = new LedMatrix();
ledMatrix.setRendererFromBuilder({
    elementId: 'led-matrix',
    rendererType: RendererType.ASCII
});
ledMatrix.init(1, () => {
    ledMatrix.play();
});