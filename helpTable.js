import AsciiTable from 'ascii-table';

export class HelpTable {
  static render(dice) {
    const table = new AsciiTable('Probability of Win for Each Dice Pair');
    table.setHeading(
      'User Dice \\ Computer Dice',
      ...dice.map((_, i) => `Dice ${i + 1}`)
    );

    dice.forEach((userDie, i) => {
      const row = [`Dice ${i + 1}`];

      dice.forEach((computerDie, j) => {
        if (i === j) {
          row.push('-');
        } else {
          const prob = HelpTable.calculateWinProbability(userDie, computerDie);
          row.push(prob.toFixed(4));
        }
      });

      table.addRow(...row);
    });

    console.log(table.toString());
  }

  static calculateWinProbability(userDie, computerDie) {
    let userWins = 0;
    let total = 0;

    for (const userFace of userDie.faces) {
      for (const computerFace of computerDie.faces) {
        if (userFace > computerFace) userWins++;
        total++;
      }
    }

    return userWins / total;
  }
}
