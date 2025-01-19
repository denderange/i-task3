import readline from 'readline';

export class PlayerManager {
  constructor(dice) {
    this.dice = dice;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  askUser(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  async chooseDice(excludedDice = null) {
    console.log('Your turn to choose a die.');
    this.dice.forEach((die, index) => {
      if (die !== excludedDice) {
        console.log(`${index}: ${die.faces.join(',')}`);
      }
    });

    const choice = await this.askUser(
      "Enter the number corresponding to your dice choice or '?' for help: "
    );
    const index = parseInt(choice, 10);

    if (isNaN(index) || index < 0 || index >= this.dice.length) {
      console.log('Invalid choice. Try again.');
      return this.chooseDice(excludedDice);
    }

    if (this.dice[index] === excludedDice) {
      console.log('This die is already chosen. Select another one.');
      return this.chooseDice(excludedDice);
    }

    console.log(`You chose: ${this.dice[index].faces.join(',')}`);
    return this.dice[index];
  }
}
