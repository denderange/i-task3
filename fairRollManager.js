import { generate as generateFairRandom } from './fairRandomGenerator.js';

export class FairRollManager {
  generateFairRandom(range) {
    return generateFairRandom(range);
  }

  async performFairRoll(range, participant, askUser = null) {
    const { key, randomValue, hmac } = generateFairRandom(range);

    if (participant === 'computer') {
      console.log(`I have selected a random number (HMAC=${hmac}).`);
      return randomValue;
    } else if (askUser) {
      console.log(`Add your number modulo ${range}.`);
      const userValue = await askUser(
        `Enter a number between 0 and ${range - 1}: `
      );
      const userNumber = parseInt(userValue, 10);

      if (isNaN(userNumber) || userNumber < 0 || userNumber >= range) {
        console.log('Invalid input. Try again.');
        return this.performFairRoll(range, participant, askUser);
      }

      const result = (randomValue + userNumber) % range;
      console.log(
        `My number was ${randomValue} (KEY=${key}). Result: ${randomValue} + ${userNumber} = ${result} (mod ${range})`
      );
      return result;
    }

    return randomValue;
  }
}
