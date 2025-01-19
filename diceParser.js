import { Dice } from './dice.js';

export class DiceParser {
  static parse(args) {
    if (args.length < 3) {
      throw new Error(
        'You must specify at least 3 dice as arguments, each with valid integer faces.'
      );
    }

    return args.map((arg, index) => {
      const faces = arg.split(',').map(Number);

      if (faces.some(isNaN)) {
        throw new Error(`Dice ${index + 1} contains invalid numbers.`);
      }

      if (faces.length !== 6) {
        throw new Error(
          `Dice ${index + 1} must have exactly 6 faces, but it has ${
            faces.length
          }.`
        );
      }

      return new Dice(faces);
    });
  }
}
