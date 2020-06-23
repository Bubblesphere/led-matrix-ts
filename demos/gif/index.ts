import { LedMatrix } from '../../src/lib/core/led-matrix';
import { CharactersJSON } from '../../src/lib/core/character-json';
import { Character } from '../../src/lib/core/character';
import { BitArray, bit } from '../../src/lib/utils/bit-array';
import SuperGif from './libgif';
import { AsciiRenderer } from '../../src/lib/core/player/rendering/ascii-renderer';
import { LedMatrixPlayer } from '../../src/lib/core/player/led-matrix-player';

const width = 100;
const ledMatrix = new LedMatrix();
const player = new LedMatrixPlayer();

ledMatrix.event.newSequence.on((sequence) => {
  player.sequence = sequence;
})

var supa = SuperGif({ gif: document.getElementById('example1'), max_width: width } );
supa.load(function() {
    processGif(supa);
    supa.play();
});

function processGif(superGif) {
  var gifAlphabet = []
  var input = "";
  for (var i = 0; i < superGif.get_length(); i++) {
      var frame: bit[] = [];
      
      enumerateCanvas(superGif.get_canvas(), function(red, green, blue, alpha) {
          var luma = red * 0.299 + green * 0.587 + blue * 0.114;
          var bit: bit = luma > 128 ? 1 : 0;
          frame.push(bit);
      })
  
      gifAlphabet.push(new Character(i.toString(), new BitArray(frame), width));
      input += `(${i.toString()})`;

      superGif.move_relative(1);
  }

  ledMatrix.addCharacters(gifAlphabet);
  ledMatrix.increment = width;
  ledMatrix.viewportWidth = width;
  ledMatrix.input = input;
  ledMatrix.padding = [0];
  ledMatrix.letterSpacing = 0;
}

function enumerateCanvas(canvas, each) {
  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  var data = imgData.data;
  
  for(var i=0; i<data.length; i+=4) {
    var red = data[i];
    var green = data[i+1];
    var blue = data[i+2];
    var alpha = data[i+3];
    each(red, green, blue, alpha);
  }
}

CharactersJSON.import("alphabet.json", (characters) => {
  ledMatrix.addCharacters(characters);
  ledMatrix.input = "hello world";
});




