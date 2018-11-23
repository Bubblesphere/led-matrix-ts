import AsciiRenderer from "../rendering/ascii-renderer";

describe('testing ASCIIRenderer', () => {
    document.body.innerHTML = '<div id="led-matrix" style="font-family: monospace; white-space: pre;"></div>';

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
            element: document.getElementById('led-matrix'),
            characterBitOn: 'X',
            characterBitOff: ' '
        });
    });

    test('Should render correctly', () => {
        renderer.render([[1,1],[0,0]]);
        expect(document.getElementById('led-matrix').innerHTML).toBe('AA\nBB\n');
    });
});

