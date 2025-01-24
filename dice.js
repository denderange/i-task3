export class Dice {
  constructor(faces) {
    if (
      !Array.isArray(faces) ||
      faces.length === 0 ||
      !faces.every(Number.isInteger)
    ) {
      throw new Error(
        'Invalid dice configuration. Each die must have an array of integers.'
      );
    }

    this.faces = faces;
  }
}
