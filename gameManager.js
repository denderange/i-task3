import { PlayerManager } from './playerManager.js';
import { ComputerManager } from './computerManager.js';
import { FairRollManager } from './fairRollManager.js';
import { HelpTable } from './helpTable.js';

export class GameManager {
  constructor(dice) {
    this.dice = dice;
    this.userDice = null;
    this.computerDice = null;

    this.playerManager = new PlayerManager(dice);
    this.computerManager = new ComputerManager(dice);
    this.fairRollManager = new FairRollManager();
  }

  async start() {
    console.log('Welcome to the Generalized Non-Transitive Dice Game!');

    await this.displayHelpOption();

    const firstMove = await this.determineFirstMove();

    if (firstMove === 'user') {
      this.userDice = await this.playerManager.chooseDice();
      this.computerDice = this.computerManager.chooseDice(this.userDice);
    } else {
      this.computerDice = this.computerManager.chooseDice();
      this.userDice = await this.playerManager.chooseDice(this.computerDice);
    }

    await this.playRound();
  }

  async displayHelpOption() {
    const showHelp = await this.playerManager.askUser(
      "Type '?' to display probabilities or press Enter to continue: "
    );
    if (showHelp === '?') {
      HelpTable.render(this.dice);
    }
  }

  async determineFirstMove() {
    console.log("Let's determine who goes first.");
    const { key, randomValue, hmac } =
      await this.fairRollManager.performFairRoll(2, 'computer');

    console.log(
      `I selected a random number (HMAC=${hmac}). Try to guess it (0 or 1).`
    );
    const userGuess = await this.playerManager.askUser('Your choice: ');
    const correct = randomValue.toString();

    if (userGuess === correct) {
      console.log(`Correct! I chose ${correct} (KEY=${key}). You go first.`);
      return 'user';
    } else {
      console.log(`Wrong! I chose ${correct} (KEY=${key}). I go first.`);
      return 'computer';
    }
  }

  async playRound() {
    console.log("It's time for the first throw!");

    const {
      randomValue: computerRoll,
      key: computerKey,
      hmac: computerHmac,
    } = await this.fairRollManager.performFairRoll(
      this.computerDice.faces.length,
      'computer'
    );

    console.log(
      `I selected a random value in the range 0..${
        this.computerDice.faces.length - 1
      } (HMAC=${computerHmac}).`
    );

    const userRoll = await this.fairRollManager.performFairRoll(
      this.userDice.faces.length,
      'user',
      async (prompt) => {
        const userInput = await this.playerManager.askUser(prompt);
        return parseInt(userInput, 10);
      }
    );

    console.log(`My number was ${computerRoll} (KEY=${computerKey}).`);
    const userValue = this.userDice.faces[userRoll];
    const computerValue = this.computerDice.faces[computerRoll];

    console.log(
      `Result: Your dice (${userValue}) vs My dice (${computerValue})`
    );

    if (userValue > computerValue) {
      console.log(`You win! (${userValue} > ${computerValue})`);
    } else if (computerValue > userValue) {
      console.log(`I win! (${computerValue} > ${userValue})`);
    } else {
      console.log(`It's a tie! (${userValue} = ${computerValue})`);
    }

    console.log('Thank you for playing!');
  }
}
