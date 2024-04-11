const prompt = require('prompt-sync')({ sigint: true });

function stringIsEmpty(string) {
  return string.trim() === '';;
}

function input(text, isString = true) {
  let read = "";
  if (isString) {
    while (stringIsEmpty(read)) {
      read = prompt(text);
      if (stringIsEmpty(read)) {
        console.log("O campo não pode ser vazio.\n");
      }
    }
  } else {
    while (!Number.isInteger(read)) {
      read = parseInt(prompt(text));
      if (!Number.isInteger(read)) {
        console.log("O campo deve conter um valor válido.\n");
      }
    }
  }
  return read;
}

module.exports = input;