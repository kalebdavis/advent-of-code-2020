var readFile = require("./fileUtil");

function part1() {
  const data = readFile("day1.txt").map((x) => parseInt(x));
  console.log(data);

  const goalNum = 2020;
  const map = {};

  let result = -Infinity;

  data.forEach((num) => {
    const inverse = goalNum - num;
    if (inverse in map) {
      result = inverse * num;
    } else {
      map[num] = inverse;
    }
  });

  console.log(result);
}

function part2() {
  const data = readFile("day1.txt").map((x) => parseInt(x));

  const goalNum = 2020;

  let i = 0;
  let j = 1;
  let k = 2;

  while (i < data.length - 1) {
    j = i + 1;
    while (j < data.length - 1) {
      k = j + 1;
      while (k < data.length - 1) {
        if (data[i] + data[j] + data[k] === goalNum) {
          return data[i] * data[j] * data[k];
        } else {
          k++;
        }
      }
      j++;
    }
    i++;
  }
}

// console.log(part1());
console.log(part2());
