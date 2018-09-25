import { bit } from "./bit-array";

export default class CharacterSizer {
    static resize(matrix: bit[], w1: number, h1: number, w2: number, h2: number) {
        const xRatio = w1 / w2;
        const yRatio = h1 / h2;
      
        let finalMatrix = new Array<bit>(w2*h2);
        for (let i = 0; i < h2; i++) {
          for (let j = 0; j < w2; j++) {
            const px = Math.floor(j*xRatio);
            const py = Math.floor(i*yRatio);
                                  
            finalMatrix[(i*w2) + j] = matrix[(py*w1) + px];
          }
        }
        return finalMatrix;
    }
}