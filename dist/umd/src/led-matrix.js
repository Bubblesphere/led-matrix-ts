(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ledMatrix"] = factory();
	else
		root["ledMatrix"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./dist/esm/lib/bit-array.js
class BitArray {
    constructor(values) {
        this._bitPerIndex = 8;
        this._size = values.length;
        this._array = new Uint8Array(Math.ceil(this._size / this._bitPerIndex));
        this._pointer = 0;
        this.pushAll(values);
    }
    get size() {
        return this._size;
    }
    push(value) {
        if (this._pointer == this._size) {
            throw `Bit array max size reached (${this._size})`;
        }
        const mask = this._createMask(this._pointer);
        if (this._matchesMask(mask, this._array[this._arrayIndex(this._pointer)])) {
            if (value === 0) {
                this._array[this._arrayIndex(this._pointer)] ^= mask;
            }
        } else {
            if (value === 1) {
                this._array[this._arrayIndex(this._pointer)] ^= mask;
            }
        }
        this._pointer++;
    }
    pushAll(values) {
        values.forEach(value => {
            this.push(value);
        });
    }
    atIndex(index) {
        if (index > this._size) {
            throw `Index (${index}) exceeds the size of the bit array (${this._size})`;
        }
        const mask = this._createMask(index);
        return this._matchesMask(mask, this._array[this._arrayIndex(index)]) ? 1 : 0;
    }
    atIndexRange(index, count) {
        if (index + count - 1 > this._size) {
            throw `Index (${index}) exceeds the size of the bit array (${this._size})`;
        }
        const values = [];
        for (let i = 0; i < count; i++) {
            const mask = this._createMask(index + i);
            values.push(this._matchesMask(mask, this._array[this._arrayIndex(index + i)]) ? 1 : 0);
        }
        return values;
    }
    _matchesMask(mask, value) {
        return (mask & value) != 0;
    }
    _createMask(index) {
        return 1 << this._bitPerIndex - 1 - this._arrayIndexOffset(index);
    }
    _arrayIndex(index) {
        return Math.floor(index / this._bitPerIndex);
    }
    _arrayIndexOffset(index) {
        return index % this._bitPerIndex;
    }
}
;
//# sourceMappingURL=bit-array.js.map
// CONCATENATED MODULE: ./dist/esm/lib/board.js
class Board {
    constructor(params) {
        this._characters = [];
        this.spacing = params.spacing;
        this.padding = params.padding;
    }
    set spacing(value) {
        if (value == null) {
            throw `Board's spacing cannot be set to null`;
        }
        if (value < 0) {
            throw `Board's spacing cannot be set to a negative number (${value})`;
        }
        this._spacing = value;
    }
    get spacing() {
        return this._spacing;
    }
    get input() {
        return this._input;
    }
    set padding(value) {
        value.forEach(x => {
            if (x == null) {
                throw `Board's padding cannot set to null`;
            }
            if (x < 0) {
                throw `Board's padding cannot be set to a negative number (${value})`;
            }
        });
        if (value.length == 1) {
            this._padding = [value[0], value[0], value[0], value[0]];
        } else if (value.length == 2) {
            this._padding = [value[0], value[1], value[0], value[1]];
        } else {
            this._padding = value;
        }
    }
    get padding() {
        return this._padding;
    }
    get width() {
        return this._horizontalPaddingWidth() + this._totalSpacingWidth() + this._characters.map(character => character.width).reduce((accumulator, current) => accumulator + current);
    }
    get height() {
        return this._verticalPaddingWidth() + this._characters.reduce((accumulator, current) => current.height > accumulator.height ? current : accumulator).height;
    }
    getColumnAtIndex(index) {
        index %= this.width;
        if (index < this._padding[3] || index >= this.width - this._padding[1]) {
            return this._emptyArrayOfLength(this.height);
        }
        let accumulator = this._padding[3];
        let toReturn;
        this._characters.some(character => {
            accumulator += character.width;
            if (accumulator > index) {
                const characterColumn = character.getColumn(index - (accumulator - character.width));
                toReturn = this._emptyArrayOfLength(this._padding[0]).concat(characterColumn).concat(this._emptyArrayOfLength(this._padding[2]));
                return true;
            }
            accumulator += this._spacing;
            if (accumulator > index) {
                toReturn = this._emptyArrayOfLength(this.height);
                return true;
            }
        });
        return toReturn;
    }
    getRowAtIndex(index) {
        index %= this.height;
        if (index < this._padding[0] || index >= this.height - this._padding[2]) {
            return this._emptyArrayOfLength(this.width);
        }
        let charactersWithSpace = [].concat.apply([], this._characters.map(x => x.getRow(index - this._padding[0]).concat(this._emptyArrayOfLength(this._spacing))));
        charactersWithSpace = charactersWithSpace.slice(0, charactersWithSpace.length - this._spacing);
        return this._emptyArrayOfLength(this._padding[3]).concat(charactersWithSpace).concat(this._emptyArrayOfLength(this._padding[1]));
    }
    load(input, dictionnary) {
        const escapeCharacter = '~';
        this._characters = [];
        for (let i = 0; i < input.length; i++) {
            let characterBuffer = input[i];
            if (characterBuffer === escapeCharacter) {
                if (i == input.length - 1) {
                    throw `No character escaped at the end of the string input`;
                }
                characterBuffer = input[++i];
            } else if (characterBuffer === "[" && (i === 0 || input[i - 1] !== escapeCharacter)) {
                do {
                    characterBuffer += input[++i];
                    if (i == input.length) {
                        throw `Could not find the end bracket for pattern ${characterBuffer}. To escape the bracket, use ${escapeCharacter}`;
                    }
                } while (input[i] != "]");
            }
            this._characters.push(dictionnary.find(characterBuffer));
        }
        this._input = input;
    }
    _horizontalPaddingWidth() {
        return this._padding[1] + this._padding[3];
    }
    _totalSpacingWidth() {
        return (this._characters.length - 1) * this._spacing;
    }
    _verticalPaddingWidth() {
        return this._padding[0] + this._padding[2];
    }
    _emptyArrayOfLength(length) {
        return Array.apply(null, Array(length)).map(() => 0);
    }
}
;
//# sourceMappingURL=board.js.map
// CONCATENATED MODULE: ./dist/esm/lib/character.js
class Character {
    constructor(patterns, output, width) {
        this._patterns = patterns;
        this._output = output;
        if (output.size >= width) {
            this._width = width;
        } else {
            throw `Output size (${output.size}) can't be smaller than the character's width (${width})`;
        }
        if (output.size % width === 0) {
            this._height = output.size / width;
        } else {
            throw `Output size (${output.size}) must be divisible by the character's width (${width})`;
        }
    }
    getColumn(index) {
        if (index < 0) {
            throw `Index (${index}) cannot be negative`;
        }
        if (index >= this._width) {
            throw `Index (${index}) is greater than the width of the character (${this._width})`;
        }
        let column = [];
        for (let i = 0; i < this._height; i++) {
            column.push(this._output.atIndex(i * this._width + index));
        }
        return column;
    }
    getRow(index) {
        if (index < 0) {
            throw `Index (${index}) cannot be negative`;
        }
        if (index >= this._height) {
            throw `Index (${index}) is greater than the height of the character (${this._height})`;
        }
        let row = [];
        for (let i = 0; i < this._width; i++) {
            row.push(this._output.atIndex(index * this._width + i));
        }
        return row;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get patterns() {
        return this._patterns;
    }
    get output() {
        return this._output;
    }
    hasPattern(input) {
        return this._patterns.indexOf(input) >= 0;
    }
}
;
//# sourceMappingURL=character.js.map
// CONCATENATED MODULE: ./dist/esm/lib/character-dictionary.js
class CharacterDictionary {
    constructor() {
        this._characters = [];
    }
    find(input) {
        const character = this._characters.filter(x => x.hasPattern(input));
        if (character && character.length > 0) {
            return character[0];
        }
        throw `Could not find character ${input} in the alphabet`;
    }
    get height() {
        return Math.max.apply(Math, this._characters.map(x => x.height));
    }
    get length() {
        return this._characters.length;
    }
    add(pendingCharacters) {
        const pendingPatterns = [].concat.apply([], pendingCharacters.map(x => x.patterns));
        const duplicatedPendingPatterns = pendingPatterns.filter((value, index, array) => {
            return array.indexOf(value) != index;
        });
        if (duplicatedPendingPatterns.length > 0) {
            throw `Different characters cannot have the same patterns. Some of the characters pending to be added have the same patterns. The following patterns were identified as duplicates: ${duplicatedPendingPatterns.join(", ")}`;
        }
        if (this._characters.length > 0) {
            const alreadyAddedPatterns = [].concat.apply([], this._characters.map(x => x.patterns));
            const duplicatedPatterns = alreadyAddedPatterns.filter(value => {
                return pendingPatterns.indexOf(value) != -1;
            });
            if (duplicatedPatterns.length > 0) {
                throw `Different characters cannot have the same patterns. One or more of the characters pending to be added has the same pattern as one or more already added characters. The following patterns were identified as duplicates: ${duplicatedPatterns.join(", ")}`;
            }
        }
        this._characters.push(...pendingCharacters);
    }
}
;
//# sourceMappingURL=character-dictionary.js.map
// CONCATENATED MODULE: ./dist/esm/lib/character-sizer.js
class NearestNeighbor {
    static scale(matrix, width, factor) {
        const ratio = 1 / factor;
        const h1 = matrix.length / width;
        const w2 = width * factor;
        const h2 = h1 * factor;
        let finalMatrix = new Array(w2 * h2);
        for (let i = 0; i < h2; i++) {
            for (let j = 0; j < w2; j++) {
                const px = Math.floor(j * ratio);
                const py = Math.floor(i * ratio);
                finalMatrix[i * w2 + j] = matrix[py * width + px];
            }
        }
        return finalMatrix;
    }
}
//# sourceMappingURL=character-sizer.js.map
// CONCATENATED MODULE: ./dist/esm/lib/character-json.js



class character_json_CharactersJSON {
    static import(path, size, success) {
        fetch(path).then(response => {
            return response.text();
        }).then(response => {
            success(character_json_CharactersJSON.parse(response, size));
        }).catch(error => {
            throw `Couldn't fetch file: ${path}`;
        });
    }
    static export() {}
    static parse(json, size) {
        if (size < 1 || size > 10) {
            throw 'Size should be between 1 and 10';
        }
        const data = JSON.parse(json);
        if (data == null) {
            throw 'Invalid character json file';
        }
        if (data.characters == null) {
            throw 'Invalid character json file: Can\'t find property characters';
        }
        return data.characters.map(x => {
            if (x.patterns == null) {
                throw 'Invalid character json file: Can\'t find property patterns for a character';
            }
            if (x.output == null) {
                throw 'Invalid character json file: Can\'t find property output for a character';
            }
            if (x.width == null) {
                throw 'Invalid character json file: Can\'t find property width for a character';
            }
            const characterRaw = x.output.map(x => x);
            const character = NearestNeighbor.scale(characterRaw, x.width, size);
            return new Character(x.patterns, new BitArray(character), x.width * size);
        });
    }
    static stringify(characters) {
        if (characters == null || characters.length == 0) {
            return JSON.stringify("");
        }
        return JSON.stringify({
            characters: characters.map(x => {
                return {
                    patterns: x.patterns,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        });
    }
}
//# sourceMappingURL=character-json.js.map
// CONCATENATED MODULE: ./dist/esm/lib/event.js
class Event {
    constructor() {
        this.handlers = [];
    }
    on(handler) {
        this.handlers.push(handler);
    }
    off(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(data) {
        this.handlers.slice(0).forEach(h => h(data));
    }
    expose() {
        return this;
    }
}
//# sourceMappingURL=event.js.map
// CONCATENATED MODULE: ./dist/esm/lib/panel.js

class panel_Panel {
    constructor(params) {
        this.onPanelUpdate = new Event();
        this.onReachingBoundary = new Event();
        this.width = params.width;
        this.fps = params.fps;
        this._board = params.board;
        this._index = 0;
        this._increment = params.increment;
        this.display = [];
        this._renderer = params.renderer;
        this._reverse = params.reverse;
    }
    get PanelUpdate() {
        return this.onPanelUpdate.expose();
    }
    get ReachingBoundary() {
        return this.onReachingBoundary.expose();
    }
    get index() {
        return this._index;
    }
    set width(value) {
        if (value == null) {
            throw `Panel's width cannot be set to null`;
        }
        if (value < 0) {
            throw `Panel's width cannot be set to a negative number (${value})`;
        }
        this._width = value;
    }
    get width() {
        return this._width;
    }
    set fps(value) {
        if (value == null) {
            throw `Panel's fps cannot be set to null`;
        }
        if (value < 0) {
            throw `Panel's fps cannot be set to a negative number (${value})`;
        }
        const maxFps = 60;
        if (value > maxFps) {
            throw `Panel's fps has to be lower than ${maxFps}`;
        }
        this._fps = value;
        this._fpsInterval = 1000 / this._fps;
    }
    get fps() {
        return this._fps;
    }
    set board(value) {
        if (value == null) {
            throw `Panel's board cannot be set to null`;
        }
        this._board = value;
    }
    get board() {
        return this._board;
    }
    set increment(value) {
        if (value == null) {
            throw `Panel's fps cannot be set to nu_rendererl`;
        }
        if (value < 0) {
            throw `Panel's fps cannot be set to a negative number (${value})`;
        }
        this._increment = value;
    }
    get increment() {
        return this._increment;
    }
    set renderer(value) {
        if (value == null) {
            throw `Panel's renderer cannot be set to null`;
        }
        this._renderer = value;
    }
    get renderer() {
        return this._renderer;
    }
    set reverse(value) {
        if (value == null) {
            throw `Panel's reverse cannot be set to null`;
        }
        this._reverse = value;
    }
    get reverse() {
        return this._reverse;
    }
    play() {
        this._index = 0;
        this._draw();
        this._startLoop();
    }
    stop() {
        this._index = 0;
        this._draw();
        this._shouldUpdate = false;
    }
    resume() {
        this._startLoop();
    }
    pause() {
        this._shouldUpdate = false;
    }
    seek(frame) {
        if (frame == null || frame < 0 || frame > this.indexUpperBound) {
            throw `Seek expects a value between 0 and ${this.indexUpperBound}`;
        }
        this._index = frame;
        this._draw();
    }
    tick() {
        this._step();
    }
    _step() {
        this._tickIndex();
        this._draw();
    }
    _draw() {
        this._resetPanel();
        this._generateDisplay(this._index);
        this.onPanelUpdate.trigger({ display: this.display });
        this._renderer.render(this.display);
    }
    _tickIndex() {
        this._reverse ? this._decrementIndex() : this._incrementIndex();
    }
    _resetPanel() {
        this.display.splice(0, this.display.length);
        for (let i = 0; i < this._board.height; i++) {
            this.display.push(Array.apply(null, Array(this.width)).map(Number.prototype.valueOf, 0));
        }
    }
    _incrementIndex() {
        if (this._index >= this.indexUpperBound) {
            this.onReachingBoundary.trigger();
            this._index = 0;
        } else {
            this._index += this._increment;
        }
    }
    _decrementIndex() {
        if (this._index === 0) {
            this.onReachingBoundary.trigger();
            this._index = this.indexUpperBound;
        } else {
            this._index -= this._increment;
        }
    }
    _startLoop() {
        this._then = Date.now();
        this._startTime = this._then;
        this._shouldUpdate = true;
        this._loop();
    }
    _loop() {
        requestAnimationFrame(this._loop.bind(this));
        if (this._shouldUpdate) {
            this._onNextFrame(this._step.bind(this));
        }
    }
    _onNextFrame(callback) {
        this._now = Date.now();
        this._elapsed = this._now - this._then;
        if (this._elapsed > this._fpsInterval) {
            this._then = this._now - this._elapsed % this._fpsInterval;
            callback();
        }
    }
}
;
//# sourceMappingURL=panel.js.map
// CONCATENATED MODULE: ./dist/esm/lib/panels/side-scrolling-panel.js

class side_scrolling_panel_SideScrollingPanel extends panel_Panel {
    constructor(params) {
        super(params);
    }
    get indexUpperBound() {
        return this.board.width - 1;
    }
    _generateDisplay(currentIndex) {
        for (let i = 0; i < this.width; i++) {
            let column;
            column = this.board.getColumnAtIndex(currentIndex + i);
            for (let j = 0; j < this.board.height; j++) {
                this.display[j][i] = column[j];
            }
        }
    }
}
//# sourceMappingURL=side-scrolling-panel.js.map
// CONCATENATED MODULE: ./dist/esm/lib/panels/vertical-scrolling-panel.js

class vertical_scrolling_panel_VerticalScrollingPanel extends panel_Panel {
    constructor(params) {
        super(params);
    }
    get indexUpperBound() {
        return this.board.height - 1;
    }
    _generateDisplay(currentIndex) {
        for (let i = 0; i < this.board.height; i++) {
            let row;
            row = this.board.getRowAtIndex(currentIndex + i);
            this.display[i] = row.slice(0, this.width);
        }
    }
}
//# sourceMappingURL=vertical-scrolling-panel.js.map
// CONCATENATED MODULE: ./dist/esm/lib/panel-builder.js


var panel_builder_PanelType;
(function (PanelType) {
    PanelType[PanelType["SideScrollingPanel"] = 0] = "SideScrollingPanel";
    PanelType[PanelType["VerticalScrollingPanel"] = 1] = "VerticalScrollingPanel";
})(panel_builder_PanelType || (panel_builder_PanelType = {}));
class panel_builder_PanelBuilder {
    static build(panelType, params) {
        switch (panelType) {
            case panel_builder_PanelType.SideScrollingPanel:
                return new side_scrolling_panel_SideScrollingPanel(params);
            case panel_builder_PanelType.VerticalScrollingPanel:
                return new vertical_scrolling_panel_VerticalScrollingPanel(params);
        }
    }
}
//# sourceMappingURL=panel-builder.js.map
// CONCATENATED MODULE: ./dist/esm/lib/rendering/renderer.js
class Renderer {
    constructor(parameters) {
        if (parameters.element == null) {
            throw `Could not find the element to render led matrix`;
        } else {
            this._parameters = {
                element: parameters.element
            };
        }
    }
}
//# sourceMappingURL=renderer.js.map
// CONCATENATED MODULE: ./dist/esm/lib/rendering/canva-renderer.js

class canva_renderer_CanvaRenderer extends Renderer {
    constructor(parameters) {
        super(parameters);
        this._parameters = {
            element: parameters.element,
            colorBitOn: parameters.colorBitOn ? parameters.colorBitOn : "#00B16A",
            colorBitOff: parameters.colorBitOff ? parameters.colorBitOff : "#22313F",
            colorStrokeOn: parameters.colorStrokeOn ? parameters.colorStrokeOn : "#67809F",
            colorStrokeOff: parameters.colorStrokeOff ? parameters.colorStrokeOff : "#67809F"
        };
    }
    get parameters() {
        return this._parameters;
    }
    get element() {
        return this._parameters.element;
    }
    render(display) {
        const ctx = this.element.getContext("2d");
        ctx.clearRect(0, 0, this.element.width, this.element.height);
        const widthEachBit = Math.floor(this.element.width / display[0].length);
        const heightEachBit = Math.floor(this.element.height / display.length);
        ctx.lineWidth = 1;
        const renderBitsOfValue = (value, fillColor, strokeColor) => {
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = fillColor;
            ctx.beginPath();
            for (var i = 0; i < display.length; i++) {
                for (var j = 0; j < display[i].length; j++) {
                    if (display[i][j] == value) {
                        this.moveToNextBit(ctx, i, j, widthEachBit, heightEachBit);
                        this.drawBit(ctx, i, j, widthEachBit, heightEachBit);
                    }
                }
            }
            ctx.fill();
            ctx.stroke();
        };
        renderBitsOfValue(0, this._parameters.colorBitOff, this._parameters.colorStrokeOff);
        renderBitsOfValue(1, this._parameters.colorBitOn, this._parameters.colorStrokeOn);
    }
}
//# sourceMappingURL=canva-renderer.js.map
// CONCATENATED MODULE: ./dist/esm/lib/rendering/canva-renderers.js

var canva_renderers_CanvaRenderers;
(function (CanvaRenderers) {
    class Ellipse extends canva_renderer_CanvaRenderer {
        constructor(parameters) {
            super(parameters);
        }
        moveToNextBit(ctx, i, j, w, h) {
            ctx.moveTo(w * (j + 1), h * (i + 1) - h / 2);
        }
        drawBit(ctx, i, j, w, h) {
            const radW = w / 2;
            const radH = h / 2;
            ctx.ellipse(w * j + radW, h * i + radH, radW, radH, 0, 0, 2 * Math.PI);
        }
    }
    CanvaRenderers.Ellipse = Ellipse;
    class Rect extends canva_renderer_CanvaRenderer {
        constructor(parameters) {
            super(parameters);
        }
        drawBit(context, i, j, w, h) {
            return context.rect(w * j, h * i, w, h);
        }
        moveToNextBit(ctx, i, j, w, h) {}
    }
    CanvaRenderers.Rect = Rect;
})(canva_renderers_CanvaRenderers || (canva_renderers_CanvaRenderers = {}));
//# sourceMappingURL=canva-renderers.js.map
// CONCATENATED MODULE: ./dist/esm/lib/rendering/ascii-renderer.js

class ascii_renderer_AsciiRenderer extends Renderer {
    constructor(parameters) {
        super(parameters);
        this._parameters = {
            element: parameters.element,
            characterBitOn: parameters.characterBitOn ? parameters.characterBitOn : "X",
            characterBitOff: parameters.characterBitOff ? parameters.characterBitOff : " "
        };
    }
    get parameters() {
        return this._parameters;
    }
    render(display) {
        let output = "";
        for (var i = 0; i < display.length; i++) {
            for (var j = 0; j < display[i].length; j++) {
                output += display[i][j] == 1 ? this._parameters.characterBitOn : this._parameters.characterBitOff;
            }
            output += '\n';
        }
        this._parameters.element.innerHTML = output;
    }
}
//# sourceMappingURL=ascii-renderer.js.map
// CONCATENATED MODULE: ./dist/esm/lib/renderer-builder.js


var renderer_builder_RendererType;
(function (RendererType) {
    RendererType[RendererType["ASCII"] = 0] = "ASCII";
    RendererType[RendererType["CanvasSquare"] = 1] = "CanvasSquare";
    RendererType[RendererType["CanvasCircle"] = 2] = "CanvasCircle";
})(renderer_builder_RendererType || (renderer_builder_RendererType = {}));
class renderer_builder_RendererBuilder {
    static build(rendererType, element) {
        switch (rendererType) {
            case renderer_builder_RendererType.ASCII:
                return new ascii_renderer_AsciiRenderer({
                    element: element
                });
            case renderer_builder_RendererType.CanvasSquare:
                return new canva_renderers_CanvaRenderers.Rect({
                    element: element
                });
            case renderer_builder_RendererType.CanvasCircle:
                return new canva_renderers_CanvaRenderers.Ellipse({
                    element: element
                });
        }
    }
}
//# sourceMappingURL=renderer-builder.js.map
// CONCATENATED MODULE: ./dist/esm/lib/led-matrix.js






class led_matrix_LedMatrix {
    constructor(params) {
        this.onReady = new Event();
        this._params = this._validateParameters(params);
        this._board = new Board({
            spacing: this._params.spacing,
            padding: this._params.padding
        });
        this._panelType = this._params.panelType;
        this._panel = panel_builder_PanelBuilder.build(this._params.panelType, {
            board: this._board,
            renderer: this._params.renderer,
            fps: this._params.fps,
            increment: this._params.increment,
            reverse: this._params.reverse,
            width: this._params.panelWidth
        });
        this.event = {
            panelUpdate: this._panel.PanelUpdate,
            reachingBoundary: this._panel.ReachingBoundary,
            ready: this.Ready
        };
    }
    get Ready() {
        return this.onReady.expose();
    }
    init(size, callback) {
        character_json_CharactersJSON.import(this._params.pathCharacters, size ? size : 1, characters => {
            this._dictionary = new CharacterDictionary();
            this._dictionary.add(characters);
            this._board.load(this._board.input != null ? this._board.input : this._params.input, this._dictionary);
            this._panel.play();
            this.onReady.trigger();
            if (callback) {
                callback();
            }
        });
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this.init(value);
    }
    get index() {
        return this._panel.index;
    }
    set spacing(value) {
        this._board.spacing = value;
        this._panel.board = this._board;
    }
    get spacing() {
        return this._board.spacing;
    }
    set padding(value) {
        this._board.padding = value;
        this._panel.board = this._board;
    }
    get padding() {
        return this._board.padding;
    }
    get width() {
        return this._board.width;
    }
    get height() {
        return this._board.height;
    }
    set input(value) {
        this._board.load(value, this._dictionary);
    }
    get input() {
        return this._board.input;
    }
    play() {
        this._panel.play();
    }
    stop() {
        this._panel.stop();
    }
    pause() {
        this._panel.pause();
    }
    resume() {
        this._panel.resume();
    }
    tick() {
        this._panel.tick();
    }
    seek(frame) {
        this._panel.seek(frame);
    }
    set panelType(value) {
        this._panelType = value;
        this._panel.stop();
        this._panel = panel_builder_PanelBuilder.build(this._panelType, {
            board: this._board,
            renderer: this._panel.renderer,
            fps: this._panel.fps,
            increment: this._panel.increment,
            reverse: this._panel.reverse,
            width: this._panel.width
        });
        this._panel.play();
    }
    get panelType() {
        return this._panelType;
    }
    set renderer(value) {
        this._panel.renderer = value;
    }
    setRendererFromBuilder(value) {
        this._panel.renderer = renderer_builder_RendererBuilder.build(value.rendererType, value.element);
    }
    get renderer() {
        return this._panel.renderer;
    }
    set fps(value) {
        this._panel.fps = value;
    }
    get fps() {
        return this._panel.fps;
    }
    set increment(value) {
        this._panel.increment = value;
    }
    get increment() {
        return this._panel.increment;
    }
    set reverse(value) {
        this._panel.reverse = value;
    }
    get reverse() {
        return this._panel.reverse;
    }
    set viewportWidth(value) {
        this._panel.width = value;
    }
    get viewportWidth() {
        return this._panel.width;
    }
    _validateParameters(params) {
        const defaultParams = {
            input: "Hello World",
            pathCharacters: "alphabet.json",
            fps: 30,
            increment: 1,
            panelType: panel_builder_PanelType.SideScrollingPanel,
            rendererType: renderer_builder_RendererType.ASCII,
            element: document.getElementById('led-matrix'),
            reverse: false,
            panelWidth: 80,
            spacing: 2,
            padding: [0, 4]
        };
        if (params) {
            params.input = this._valueOrDefault(params.input, defaultParams.input);
            params.pathCharacters = this._valueOrDefault(params.pathCharacters, defaultParams.pathCharacters);
            params.spacing = this._valueOrDefault(params.spacing, defaultParams.spacing);
            params.padding = this._valueOrDefault(params.padding, defaultParams.padding);
            params.fps = this._valueOrDefault(params.fps, defaultParams.fps);
            params.increment = this._valueOrDefault(params.increment, defaultParams.increment);
            params.panelType = this._valueOrDefault(params.panelType, defaultParams.panelType);
            ;
            params.reverse = this._valueOrDefault(params.reverse, defaultParams.reverse);
            params.panelWidth = this._valueOrDefault(params.panelWidth, defaultParams.panelWidth);
            if (params.renderer != null) {
                params.renderer = params.renderer;
            } else {
                params.rendererType = this._valueOrDefault(params.rendererType, defaultParams.rendererType);
                params.element = this._valueOrDefault(params.element, defaultParams.element);
                params.renderer = renderer_builder_RendererBuilder.build(params.rendererType, params.element);
            }
            return params;
        }
        return defaultParams;
    }
    _valueOrDefault(value, defaultValue) {
        return value ? value : defaultValue;
    }
}
//# sourceMappingURL=led-matrix.js.map
// CONCATENATED MODULE: ./dist/esm/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BitArray", function() { return BitArray; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Board", function() { return Board; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Character", function() { return Character; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CharacterDictionary", function() { return CharacterDictionary; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CharactersJSON", function() { return character_json_CharactersJSON; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NearestNeighbor", function() { return NearestNeighbor; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "LedMatrix", function() { return led_matrix_LedMatrix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return panel_Panel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PanelType", function() { return panel_builder_PanelType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "PanelBuilder", function() { return panel_builder_PanelBuilder; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "RendererType", function() { return renderer_builder_RendererType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "RendererBuilder", function() { return renderer_builder_RendererBuilder; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SideScrollingPanel", function() { return side_scrolling_panel_SideScrollingPanel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VerticalScrollingPanel", function() { return vertical_scrolling_panel_VerticalScrollingPanel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "AsciiRenderer", function() { return ascii_renderer_AsciiRenderer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CanvaRenderer", function() { return canva_renderer_CanvaRenderer; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CanvaRenderers", function() { return canva_renderers_CanvaRenderers; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Renderer", function() { return Renderer; });

















//# sourceMappingURL=index.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=led-matrix.js.map