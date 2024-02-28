import * as readlineSync from 'readline-sync';

export const askForSensetive = (
  question: string,
  options?: readlineSync.BasicOptions,
): string => {
  const result = readlineSync.question(question, {
    hideEchoBack: true,
    ...options,
  });
  return result;
};

export const askForUsual = (
  question: string,
  options?: readlineSync.BasicOptions,
): string => {
  const result = readlineSync.question(question, {
    ...options,
  });
  return result;
};
