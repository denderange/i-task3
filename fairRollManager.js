import FairRandomGenerator from './fairRandomGenerator.js';

export class FairRollManager {
  generateFairRandom(range) {
    return FairRandomGenerator.generate(range);
  }

  async performFairRoll(range, participant, askUser = null) {
    const { key, randomValue, hmac } = FairRandomGenerator.generate(range);

    if (participant === 'computer') {
      console.log(`I selected a random value (HMAC=${hmac}).`);
      console.log('You will know my choice after you make yours.');
      return { randomValue, key };
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
