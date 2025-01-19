import { DiceParser } from './diceParser.js';
import { GameManager } from './gameManager.js';

try {
  const args = process.argv.slice(2);
  const dice = DiceParser.parse(args);
  const gameManager = new GameManager(dice);
  await gameManager.start();
} catch (error) {
  console.error(`Error: ${error.message}`);
  console.log('Usage: node index.js <dice1> <dice2> <dice3> ...');
  console.log(
    'Each dice should be a comma-separated list of integers. Example:'
  );
  console.log('node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3');
}
