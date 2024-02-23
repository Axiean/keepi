import {Command} from "commander";

export const main = () => {
  const program = new Command();

  program
    .description("An application for displaying a password")
    .arguments("<password>")
    .option("-p, --append-zeros", 'Append "000" to the password')
    .action((password, options) => {
      if (options.appendZeros) {
        password += "000";
      }
      console.log(`You entered the password: ${password}`);
    });

  program.parse(process.argv);
};
