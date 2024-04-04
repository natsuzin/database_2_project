const prompt = require('prompt-sync')({ sigint: true });

function stringIsEmpty(string) {
  return string.trim() === '';;
}

function isNotNumber(number) {
  return !parseInt(number);
}

function input(text, isString = true) {
  if (isString) {
    let read = "";
    while (stringIsEmpty(read)) {
      read = prompt(text);
      if (stringIsEmpty(read)) {
        console.log("O campo não pode ser vazio.\n");
      }
    }
    return read;
  } else {
    let read = "";
    while (isNotNumber(read)) {
      read = prompt(text);
      if (isNotNumber(read)) {
        console.log("O campo deve conter um valor válido.\n");
      }
    }
    return parseInt(read);
  }
}

module.exports = input;