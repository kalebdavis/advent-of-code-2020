var readFile = require("./fileUtil");

function part1() {
  const data = readFile("day2.txt");
  let numValid = 0;
  data.forEach((passwordRow) => {
    let regExp = /(\d+)-(\d+) ([a-z]): (\w+)/;
    matches = passwordRow.match(regExp);
    min = parseInt(matches[1]);
    max = parseInt(matches[2]);
    targetLetter = matches[3];
    password = matches[4];

    occurrences = password.match(new RegExp(targetLetter, "g")) || [];
    if (occurrences.length <= max && occurrences.length >= min) {
      numValid++;
    }
  });
  console.log(numValid);
}

function part2() {
  const data = readFile("day2.txt");
  let numValid = 0;

  data.forEach((passwordRow) => {
    let regExp = /(\d+)-(\d+) ([a-z]): (\w+)/;
    matches = passwordRow.match(regExp);
    firstIndex = parseInt(matches[1]);
    secondIndex = parseInt(matches[2]);
    targetLetter = matches[3];
    password = matches[4].split("");

    console.log(
      `${passwordRow}: first ${password[firstIndex - 1]} second: ${
        password[secondIndex - 1]
      }`
    );
    if (password[firstIndex - 1] === targetLetter) {
      if (password[secondIndex - 1] !== targetLetter) {
        console.log("valid password");
        numValid++;
      }
    } else if (password[secondIndex - 1] === targetLetter) {
      console.log(passwordRow);
      console.log("Valid password, second index matches and first does not");
      numValid++;
    }
  });
  console.log(numValid);
}

part2();
