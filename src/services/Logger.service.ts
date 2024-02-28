const chalk = require('chalk');

export const errorLog = (message: string) => {
  console.error(chalk.red(message));
};

export const successLog = (message: string) => {
  console.log(chalk.green(message));
};

export const warnLog = (message: string) => {
  console.log(chalk.yellow(message));
};

export const welcomeLog = () => {
  const welcomeMessage = `
${chalk.bold.green('Welcome to KEEPI!')}
${chalk.underline('----------------------------------------')}

${chalk.bold(
  'To ensure the security of your account, KEEPI employs end-to-end encryption.',
)}
${chalk.dim(
  'We want you to know that your sensitive information is stored securely on your local machine.',
)}
${chalk.dim(
  'We do not store your secret key anywhere in our system; it is crucial for encrypting and decrypting your data, especially passwords.',
)}

${chalk.bold("Here's what you need to know:")}

${chalk.blue('1. Setting Your Secret Key:')}
   - When you first use the app, you will be ${chalk.bold.underline(
     'prompted to set a secret key.',
   )}
   - This secret key is ${chalk.bold.underline(
     'vital for encrypting your passwords',
   )} securely.

${chalk.blue('2. Remember Your Secret Key:')}
   - Your secret key will not be stored in your local database or memory.
   - You need to ${chalk.bold.underline(
     'remember and enter it',
   )} each time you want to access your passwords.

${chalk.blue('3. Security Matters:')}
   - Your secret key is your responsibility. ${chalk.bold.underline(
     'Do not share it',
   )} with anyone.
   - If you forget your secret key, ${chalk.bold.underline(
     'we cannot retrieve it',
   )} for you. Treat it like a master password.

${chalk.blue('4. Changing Your Secret Key:')}
   - You can change your secret key at any time for added security.
   - ${chalk.dim(
     'Changing your key will cause all passwords to be re-encrypted. This process is automatic, and you do not need to take any additional action.',
   )}

${chalk.blue('5. Troubleshooting:')}
   - If you forget your secret key and cannot access your passwords, unfortunately, there is no way to retrieve it. Your data is encrypted and secure.
   - If you encounter any problems or find bugs, please report them on our GitHub issues page: ${chalk.blue.underline(
     'https://github.com/Axiean/keepi/issues',
   )}
   - For additional assistance, you can also email the author at: ${chalk.blue.underline(
     'axieans@gmail.com',
   )}



${chalk.bold(
  'Thank you for choosing KEEPI for your password management needs. Your security is our top priority.',
)}
`;

  console.log(welcomeMessage);
};

export const boxedLog = async (title: string, text: string) => {
  const boxen = await import('boxen');

  console.log(
    boxen.default(text, {
      padding: 1,
      title: chalk.blue(title),
      titleAlignment: 'left',
    }),
  );
};
