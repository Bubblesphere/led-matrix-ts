import { bit } from "./bit-array";

export default class NearestNeighbor {
    static scale(matrix: bit[], width: number, factor: number) {
        const ratio = 1 / factor;
        const h1 = matrix.length / width;
        const w2 = width * factor;
        const h2 = h1 * factor;

        let finalMatrix = new Array<bit>(w2 * h2);
        for (let i = 0; i < h2; i++) {
          for (let j = 0; j < w2; j++) {
            const px = Math.floor(j * ratio);
            const py = Math.floor(i * ratio);
                                  
            finalMatrix[(i * w2) + j] = matrix[(py * width) + px];
          }
        }

        return finalMatrix;
    }
}