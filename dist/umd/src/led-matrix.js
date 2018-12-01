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

// CONCATENATED MODULE: ./dist/esm/lib/utils/exception.js
class Exception {
    static throwIfNull(value, valueDescription) {
        if (value == null) {
            throw `${valueDescription} property cannot be set to null`;
        }
    }
    static throwIfNegative(value, valueDescription) {
        if (value < 0) {
            throw `${valueDescription} property cannot be set to a negative number (${value})`;
        }
    }
    static throwIfNotBetween(value, valueDescription, rangeFrom, rangeTo) {
        if (value < rangeFrom || value > rangeTo) {
            throw `Seek expects a value between ${rangeFrom} and ${rangeTo}`;
        }
    }
    static getDescriptionForProperty(className, methodName) {
        return `${className}'s ${methodName}`;
    }
}
//# sourceMappingURL=exception.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/character.js

class character_Character {
    constructor(pattern, output, width) {
        this.CLASS_NAME = character_Character.name;
        this._pattern = pattern;
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
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get pattern() {
        return this._pattern;
    }
    get output() {
        return this._output;
    }
    getColumn(index) {
        Exception.throwIfNotBetween(index, Exception.getDescriptionForProperty(this.CLASS_NAME, 'getColumn'), 0, this._width - 1);
        let column = [];
        for (let i = 0; i < this._height; i++) {
            column.push(this._output.atIndex(i * this._width + index));
        }
        return column;
    }
    getRow(index) {
        Exception.throwIfNotBetween(index, Exception.getDescriptionForProperty(this.CLASS_NAME, 'getRow'), 0, this._height - 1);
        let row = [];
        for (let i = 0; i < this._width; i++) {
            row.push(this._output.atIndex(index * this._width + i));
        }
        return row;
    }
    hasPattern(input) {
        return this._pattern == input;
    }
}
;
//# sourceMappingURL=character.js.map
// CONCATENATED MODULE: ./dist/esm/lib/utils/bit-array.js
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
// CONCATENATED MODULE: ./dist/esm/lib/core/character-sizer.js
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
// CONCATENATED MODULE: ./dist/esm/lib/utils/event.js
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
// CONCATENATED MODULE: ./dist/esm/lib/core/board.js





class board_Board {
    constructor(params) {
        this.CLASS_NAME = board_Board.name;
        this.onPropertyChange = new Event();
        this._characters = [];
        this._letterSpacing = params.letterSpacing;
        this.padding = params.padding;
        this._size = params.size;
        this.onPropertyChange.trigger();
    }
    get PropertyChange() {
        return this.onPropertyChange.expose();
    }
    get letterSpacing() {
        return this._letterSpacing;
    }
    get padding() {
        return this._padding;
    }
    get characters() {
        return this._characters;
    }
    get input() {
        return this._input;
    }
    get size() {
        return this._size;
    }
    get width() {
        const paddingAndSpacingWidth = this._horizontalPaddingWidth() + this._totalSpacingWidth();
        if (this._characters.length > 0) {
            return paddingAndSpacingWidth + this._characters.map(character => character.width).reduce((accumulator, current) => accumulator + current);
        } else {
            return paddingAndSpacingWidth;
        }
    }
    get height() {
        if (this._characters.length > 0) {
            return this._verticalPaddingWidth() + this._characters.reduce((accumulator, current) => current.height > accumulator.height ? current : accumulator).height;
        } else {
            return this._verticalPaddingWidth();
        }
    }
    set letterSpacing(value) {
        const letterSpacingDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'padding');
        Exception.throwIfNull(value, letterSpacingDescription);
        Exception.throwIfNegative(value, letterSpacingDescription);
        const prevLetterSpacing = this._letterSpacing;
        this._letterSpacing = value;
        this._emitPropertyChangeEvent(value, prevLetterSpacing);
    }
    set padding(value) {
        const paddingDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'padding');
        value.forEach(x => {
            Exception.throwIfNull(x, paddingDescription);
            Exception.throwIfNegative(x, paddingDescription);
        });
        const nextPadding = value.length == 1 ? [value[0], value[0], value[0], value[0]] : value.length == 2 ? [value[0], value[1], value[0], value[1]] : value;
        if (this._padding) {
            let prevPadding = [...this._padding];
            this._padding = [nextPadding[0], nextPadding[1], nextPadding[2], nextPadding[3]];
            if (this._padding[0] != prevPadding[0] || this._padding[1] != prevPadding[1] || this._padding[2] != prevPadding[2] || this._padding[3] != prevPadding[3]) {
                this.onPropertyChange.trigger();
            }
        } else {
            this._padding = [nextPadding[0], nextPadding[1], nextPadding[2], nextPadding[3]];
            this.onPropertyChange.trigger();
        }
    }
    getColumnAtIndex(index) {
        index %= this.width;
        if (index < this._padding[3] || index >= this.width - this._padding[1]) {
            return this._createBitOffArrayOfLength(this.height);
        }
        let accumulator = this._padding[3];
        let toReturn;
        this._characters.some(character => {
            accumulator += character.width;
            if (accumulator > index) {
                const characterColumn = character.getColumn(index - (accumulator - character.width));
                toReturn = this._createBitOffArrayOfLength(this._padding[0]).concat(characterColumn).concat(this._createBitOffArrayOfLength(this._padding[2]));
                if (toReturn.length < this.height) {
                    toReturn.concat(this._createBitOffArrayOfLength(this.height - characterColumn.length));
                }
                return true;
            }
            accumulator += this._letterSpacing;
            if (accumulator > index) {
                toReturn = this._createBitOffArrayOfLength(this.height);
                return true;
            }
        });
        return toReturn;
    }
    getRowAtIndex(index) {
        index %= this.height;
        if (index < this._padding[0] || index >= this.height - this._padding[2]) {
            return this._createBitOffArrayOfLength(this.width);
        }
        let charactersWithSpace = [].concat.apply([], this._characters.map(x => x.getRow(index - this._padding[0]).concat(this._createBitOffArrayOfLength(this._letterSpacing))));
        charactersWithSpace = charactersWithSpace.slice(0, charactersWithSpace.length - this._letterSpacing);
        return this._createBitOffArrayOfLength(this._padding[3]).concat(charactersWithSpace).concat(this._createBitOffArrayOfLength(this._padding[1]));
    }
    load(input, dictionnary, size = 1) {
        const escapeCharacter = '\\';
        const delimiterWord = {
            start: "(",
            end: ")"
        };
        this._characters = [];
        this._size = size;
        for (let i = 0; i < input.length; i++) {
            let characterBuffer = input[i];
            if (characterBuffer === escapeCharacter) {
                if (i == input.length - 1) {
                    throw `No character escaped at the end of the string input`;
                }
                characterBuffer = input[++i];
            } else if (characterBuffer === delimiterWord.start && (i === 0 || input[i - 1] !== escapeCharacter)) {
                do {
                    characterBuffer += input[++i];
                    if (i == input.length) {
                        throw `Could not find the ending delimiter "${delimiterWord.end}" for pattern ${characterBuffer}`;
                    }
                } while (input[i] != delimiterWord.end);
                characterBuffer = characterBuffer.slice(1, -1);
            }
            const character = dictionnary.find(characterBuffer);
            this._characters.push(new character_Character(character.pattern, new BitArray(NearestNeighbor.scale(character.output.atIndexRange(0, character.output.size), character.width, this._size)), character.width * this._size));
        }
        this._input = input;
        this.onPropertyChange.trigger();
    }
    _horizontalPaddingWidth() {
        return this._padding[1] + this._padding[3];
    }
    _totalSpacingWidth() {
        return (this._characters.length - 1) * this._letterSpacing;
    }
    _verticalPaddingWidth() {
        return this._padding[0] + this._padding[2];
    }
    _createBitOffArrayOfLength(length) {
        return Array.apply(null, Array(length)).map(() => 0);
    }
    _emitPropertyChangeEvent(value, prevValue) {
        if (value != prevValue) {
            this.onPropertyChange.trigger();
        }
    }
}
;
//# sourceMappingURL=board.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/panel.js


class panel_Panel {
    constructor(params) {
        this.CLASS_NAME = panel_Panel.name;
        this._initiated = false;
        this._latestCurrentSequenceUuid = 0;
        this.onNewSequence = new Event();
        this._params = params;
        this._initiated = true;
        this.updateCurrentSequence();
        this._params.board.PropertyChange.on(() => {
            this.updateCurrentSequence();
        });
    }
    get NewSequence() {
        return this.onNewSequence.expose();
    }
    get width() {
        return this._params.width;
    }
    get board() {
        return this._params.board;
    }
    get increment() {
        return this._params.increment;
    }
    get reverse() {
        return this._params.reverse;
    }
    get scroller() {
        return this._params.scroller;
    }
    set width(value) {
        const widthDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'width');
        Exception.throwIfNull(value, widthDescription);
        Exception.throwIfNegative(value, widthDescription);
        if (this._params.width != value) {
            this._params.width = value;
            this.updateCurrentSequence();
        }
    }
    set board(value) {
        Exception.throwIfNull(value, Exception.getDescriptionForProperty(this.CLASS_NAME, 'board'));
        if (this._params.board != value) {
            this._params.board = value;
            this.updateCurrentSequence();
        }
    }
    set increment(value) {
        const fpsDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'fps');
        Exception.throwIfNull(value, fpsDescription);
        Exception.throwIfNegative(value, fpsDescription);
        if (this._params.increment != value) {
            this._params.increment = value;
            this.updateCurrentSequence();
        }
    }
    set reverse(value) {
        const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
        Exception.throwIfNull(value, reverseDescription);
        if (value != this._params.reverse) {
            this._params.reverse = value;
            this.updateCurrentSequence();
        }
    }
    set scroller(value) {
        const reverseDescription = Exception.getDescriptionForProperty(this.CLASS_NAME, 'reverse');
        Exception.throwIfNull(value, reverseDescription);
        if (value != this._params.scroller) {
            this._params.scroller = value;
            this.updateCurrentSequence();
        }
    }
    GetCurrentSequence() {
        return new Promise(resolve => {
            let sequence = [];
            let panelIndex = 0;
            for (let i = 0; i <= (this.increment == 0 ? 0 : this._params.scroller.loopEndIndex(this) / this.increment); i++) {
                sequence.push(this._params.scroller.generatePanelFrameAtIndex(panelIndex, this));
                panelIndex = this._tickPanelIndex(panelIndex);
            }
            resolve(sequence);
        });
    }
    updateCurrentSequence() {
        if (this._initiated) {
            this._latestCurrentSequenceUuid += 1;
            const currentUuid = this._latestCurrentSequenceUuid;
            this.GetCurrentSequence().then(sequence => {
                if (currentUuid == this._latestCurrentSequenceUuid && sequence[0].length > 0) {
                    this.onNewSequence.trigger(sequence);
                }
            });
        }
    }
    _tickPanelIndex(index) {
        return this._params.reverse ? this._decrementIndex(index) : this._incrementIndex(index);
    }
    _incrementIndex(index) {
        return index >= this._params.scroller.loopEndIndex(this) ? 0 : index + this._params.increment;
    }
    _decrementIndex(index) {
        return index === 0 ? this._params.scroller.loopEndIndex(this) : index - this._params.increment;
    }
}
;
//# sourceMappingURL=panel.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/character-dictionary.js
class CharacterDictionary {
    constructor() {
        this._characters = [];
    }
    get characters() {
        return this._characters;
    }
    get height() {
        return Math.max.apply(Math, this._characters.map(x => x.height));
    }
    get length() {
        return this._characters.length;
    }
    find(input) {
        const character = this._characters.filter(x => x.hasPattern(input));
        if (character && character.length > 0) {
            return character[0];
        }
        throw `Could not find character ${input} in the alphabet`;
    }
    add(pendingCharacters) {
        const pendingPatterns = pendingCharacters.map(x => x.pattern);
        const duplicatedPendingPatterns = pendingPatterns.filter((value, index, array) => {
            return array.indexOf(value) != index;
        });
        if (duplicatedPendingPatterns.length > 0) {
            throw `Pattern already used by another pending character`;
        }
        if (this._characters.length > 0) {
            const alreadyAddedPatterns = this._characters.map(x => x.pattern);
            const duplicatedPatterns = alreadyAddedPatterns.filter(value => {
                return pendingPatterns.indexOf(value) != -1;
            });
            if (duplicatedPatterns.length > 0) {
                throw `Pattern already used by another character`;
            }
        }
        this._characters.push(...pendingCharacters);
    }
    edit(pendingCharacter) {
        let edited = false;
        this._characters.forEach((character, index, arr) => {
            if (character.pattern == pendingCharacter.pattern && !edited) {
                arr[index] = pendingCharacter;
                edited = true;
            }
        });
        if (!edited) {
            throw `Could not find character ${pendingCharacter.pattern} in the alphabet. Aborted edit operation`;
        }
    }
    delete(pendingCharacter) {
        let deleted = false;
        this._characters.forEach((character, index, arr) => {
            if (character.pattern == pendingCharacter.pattern && !deleted) {
                arr.splice(index, 1);
                deleted = true;
            }
        });
        if (!deleted) {
            throw `Could not find character ${pendingCharacter.pattern} in the alphabet. Aborted delete operation`;
        }
    }
}
;
//# sourceMappingURL=character-dictionary.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/scrollers/side-scroller.js
class SideScroller {
    loopEndIndex(params) {
        return params.board.width - 1;
    }
    generatePanelFrameAtIndex(currentIndex, panel) {
        let columns = [];
        for (let i = 0; i < panel.width; i++) {
            columns.push(panel.board.getColumnAtIndex(currentIndex + i));
        }
        let panelFrame = [];
        for (let i = 0; i < columns[0].length; i++) {
            panelFrame.push(columns.map(x => x[i]));
        }
        return panelFrame;
    }
}
//# sourceMappingURL=side-scroller.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/led-matrix.js





class led_matrix_LedMatrix {
    constructor(params) {
        this.onReady = new Event();
        this._params = this._validateParameters(params);
        this._panel = new panel_Panel({
            board: new board_Board({
                letterSpacing: this._params.letterSpacing,
                padding: this._params.padding,
                size: this._params.size
            }),
            increment: this._params.increment,
            reverse: this._params.reverse,
            width: this._params.panelWidth,
            scroller: this._params.scroller
        });
        this.event = {
            newSequence: this._panel.NewSequence
        };
        this._dictionary = new CharacterDictionary();
    }
    get Ready() {
        return this.onReady.expose();
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this._panel.board.load(this.input, this._dictionary, this.size);
        this._panel.GetCurrentSequence();
    }
    get loopEndIndex() {
        return this._panel.scroller.loopEndIndex(this._panel);
    }
    addCharacters(characters) {
        this._dictionary.add(characters);
    }
    addCharacter(character) {
        this._dictionary.add([character]);
    }
    editCharacter(character) {
        this._dictionary.edit(character);
    }
    deleteCharacter(character) {
        this._dictionary.delete(character);
    }
    get loadedCharacters() {
        return this._dictionary.characters;
    }
    get usedCharacters() {
        return this._panel.board.characters;
    }
    set letterSpacing(value) {
        this._panel.board.letterSpacing = value;
    }
    get letterSpacing() {
        return this._panel.board.letterSpacing;
    }
    set padding(value) {
        this._panel.board.padding = value;
    }
    get padding() {
        return this._panel.board.padding;
    }
    get width() {
        return this._panel.board.width;
    }
    get height() {
        return this._panel.board.height;
    }
    set input(value) {
        this._panel.board.load(value, this._dictionary);
    }
    get input() {
        return this._panel.board.input;
    }
    get sequence() {
        return this._panel.GetCurrentSequence();
    }
    set scroller(value) {
        this._panel.scroller = value;
    }
    get scroller() {
        return this._panel.scroller;
    }
    get reverse() {
        return this._panel.reverse;
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
    set viewportWidth(value) {
        this._panel.width = value;
    }
    get viewportWidth() {
        return this._panel.width;
    }
    _validateParameters(params) {
        let defaultParams = {
            increment: 1,
            scroller: new SideScroller(),
            reverse: false,
            panelWidth: 78,
            letterSpacing: 2,
            padding: [0, 20, 0, 0],
            size: 1
        };
        if (params) {
            params.letterSpacing = this._valueOrDefaultIfNull(params.letterSpacing, defaultParams.letterSpacing);
            params.padding = this._valueOrDefaultIfNull(params.padding, defaultParams.padding);
            params.size = this._valueOrDefaultIfNull(params.size, defaultParams.size);
            params.increment = this._valueOrDefaultIfNull(params.increment, defaultParams.increment);
            params.scroller = this._valueOrDefaultIfNull(params.scroller, defaultParams.scroller);
            params.reverse = this._valueOrDefaultIfNull(params.reverse, defaultParams.reverse);
            params.panelWidth = this._valueOrDefaultIfNull(params.panelWidth, defaultParams.panelWidth);
            return params;
        }
        return defaultParams;
    }
    _valueOrDefaultIfNull(value, defaultValue) {
        return value == null ? defaultValue : value;
    }
}
//# sourceMappingURL=led-matrix.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/scrollers/vertical-scroller.js
class VerticalScroller {
    loopEndIndex(panel) {
        return panel.board.height - 1;
    }
    generatePanelFrameAtIndex(currentIndex, panel) {
        let display = [];
        for (let i = 0; i < panel.board.height; i++) {
            let row;
            row = panel.board.getRowAtIndex(currentIndex + i);
            display.push(row.slice(0, panel.width));
        }
        return display;
    }
}
//# sourceMappingURL=vertical-scroller.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/scrollers/scroller-builder.js


var scroller_builder_ScrollerTypes;
(function (ScrollerTypes) {
    ScrollerTypes[ScrollerTypes["Side"] = 0] = "Side";
    ScrollerTypes[ScrollerTypes["Vertical"] = 1] = "Vertical";
})(scroller_builder_ScrollerTypes || (scroller_builder_ScrollerTypes = {}));
class scroller_builder_ScrollerBuilder {
    static build(scrollerType) {
        switch (scrollerType) {
            case scroller_builder_ScrollerTypes.Side:
                return new SideScroller();
            case scroller_builder_ScrollerTypes.Vertical:
                return new VerticalScroller();
        }
    }
}
//# sourceMappingURL=scroller-builder.js.map
// CONCATENATED MODULE: ./dist/esm/lib/core/character-json.js


class character_json_CharactersJSON {
    static import(path, success) {
        fetch(path).then(response => {
            return response.text();
        }).then(response => {
            success(character_json_CharactersJSON.parse(response));
        }).catch(error => {
            throw `Couldn't fetch file: ${path}`;
        });
    }
    static export() {}
    static parse(json) {
        const data = JSON.parse(json);
        if (data == null) {
            throw 'Invalid character json file';
        }
        if (data.characters == null) {
            throw 'Invalid character json file: Can\'t find property characters';
        }
        return data.characters.map(x => {
            if (x.pattern == null) {
                throw 'Invalid character json file: Can\'t find property patterns for a character';
            }
            if (x.output == null) {
                throw 'Invalid character json file: Can\'t find property output for a character';
            }
            if (x.width == null) {
                throw 'Invalid character json file: Can\'t find property width for a character';
            }
            return new character_Character(x.pattern, new BitArray(x.output.map(x => x)), x.width);
        });
    }
    static stringify(characters) {
        if (characters == null || characters.length == 0) {
            return JSON.stringify("");
        }
        return JSON.stringify({
            characters: characters.map(x => {
                return {
                    patterns: x.pattern,
                    output: x.output.atIndexRange(0, x.output.size),
                    width: x.width
                };
            })
        });
    }
}
//# sourceMappingURL=character-json.js.map
// CONCATENATED MODULE: ./dist/esm/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "LedMatrix", function() { return led_matrix_LedMatrix; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScrollerTypes", function() { return scroller_builder_ScrollerTypes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "ScrollerBuilder", function() { return scroller_builder_ScrollerBuilder; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SideScroller", function() { return SideScroller; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "VerticalScroller", function() { return VerticalScroller; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Board", function() { return board_Board; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CharacterDictionary", function() { return CharacterDictionary; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "CharactersJSON", function() { return character_json_CharactersJSON; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "NearestNeighbor", function() { return NearestNeighbor; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Character", function() { return character_Character; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Panel", function() { return panel_Panel; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "BitArray", function() { return BitArray; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Exception", function() { return Exception; });













//# sourceMappingURL=index.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=led-matrix.js.map