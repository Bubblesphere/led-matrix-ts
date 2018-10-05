import { LedMatrix } from '../../src/lib/led-matrix';
import { RendererType } from '../../src/lib/renderer-builder';

const ledMatrix = new LedMatrix();
ledMatrix.setRendererFromBuilder({
    element: document.getElementById('led-matrix'),
    rendererType: RendererType.ASCII
});
ledMatrix.init();