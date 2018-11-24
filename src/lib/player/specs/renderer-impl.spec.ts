import { AsciiRenderer } from "../rendering/ascii-renderer";

describe('testing ASCIIRenderer', () => {

    let renderer: AsciiRenderer;
    const defaultParams = {
        elementId: 'led-matrix',
        characterBitOn: 'A',
        characterBitOff: 'B'
    };

    beforeEach(() => {
        renderer = new AsciiRenderer(defaultParams);
    });

    test('Should be able to retrieve parameters', () => {
        expect(renderer.parameters).toEqual(defaultParams);
    });

    test('Should be able to retrieve default parameters if they\'re not passed', () => {
        renderer = new AsciiRenderer({
            elementId: 'led-matrix'
        });

        expect(renderer.parameters).toEqual({
            elementId: 'led-matrix',
            characterBitOn: 'X',
            characterBitOff: ' '
        });
    });
});

