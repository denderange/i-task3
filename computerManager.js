export class ComputerManager {
  constructor(dice) {
    this.dice = dice;
  }

  chooseDice(excludedDice = null) {
    const availableDice = this.dice.filter((die) => die !== excludedDice);
    const choice = availableDice[0];
    console.log(`I chose: ${choice.faces.join(',')}`);

    return choice;
  }
}
