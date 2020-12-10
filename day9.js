const readFile = require("./fileUtil");

function part1() {
  const data = readFile("day9.txt").map((x) => parseInt(x));
  const preamble = 25;

  for (let i = preamble; i < data.length; i++) {
    const goalNum = data[i];
    const arr = data.slice(i - preamble, i);
    if (!twoSum(goalNum, arr)) {
      console.log(goalNum);
      break;
    }
  }
  console.log("Finished");
}

function twoSum(goalNum, arr) {
  const map = {};
  let foundMatch = false;
  arr.forEach((num) => {
    const inverse = goalNum - num;
    if (inverse in map) {
      foundMatch = true;
    } else {
      map[num] = inverse;
    }
  });
  return foundMatch;
}

function part2() {
  const data = readFile("day9.txt").map((x) => parseInt(x));
  const goalNum = 69316178;

  for (let i = 0; i < data.length; i++) {
    let done = false;
    let sum = 0;
    for (let j = i; j < data.length && !done; j++) {
      sum += data[j];
      if (sum > goalNum) {
        done = true;
      } else if (sum === goalNum) {
        done = true;
        console.log(data.slice(i, j + 1));
        const goalArr = data.slice(i, j + 1).sort();
        console.log(goalArr[0] + goalArr[goalArr.length - 1]);
        break;
      }
    }
  }
}

part2();
