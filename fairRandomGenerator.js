import { randomBytes, randomInt, createHmac } from 'crypto';

class FairRandomGenerator {
  static generate(range) {
    if (range <= 0) {
      throw new Error('Range must be greater than 0.');
    }

    const key = randomBytes(32).toString('hex');
    const randomValue = randomInt(0, range);

    const hmac = createHmac('sha3-256', key)
      .update(randomValue.toString())
      .digest('hex');

    return { key, randomValue, hmac };
  }

  static verify(hmac, key, randomValue) {
    const recalculatedHmac = createHmac('sha3-256', key)
      .update(randomValue.toString())
      .digest('hex');

    return recalculatedHmac === hmac;
  }
}

export const generate = FairRandomGenerator.generate;
