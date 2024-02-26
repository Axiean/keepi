const chalk = require('chalk');

export const errorLog = (message: string) => {
  console.error(chalk.red(message));
};
export const successLog = (message: string) => {
  console.log(chalk.green(message));
};
