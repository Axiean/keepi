"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const commander_1 = require("commander");
const main = () => {
    const program = new commander_1.Command();
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
exports.main = main;
//# sourceMappingURL=password.js.map