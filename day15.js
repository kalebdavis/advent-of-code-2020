const readFile = require("./fileUtil");

function part1() {
  const nums = readFile("day15.txt")[0]
    .split(",")
    .map((x) => parseInt(x));
  const limit = 30000000;

  const seenBefore = {};
  let currentNumber;

  nums.forEach((num, index) => {
    seenBefore[num] = [index];
  });

  for (let i = nums.length; i < limit; i++) {
    if (i % 10000 === 0) {
      console.log(i);
    }
    const lastNumber = nums[i - 1];
    if (seenBefore[lastNumber].length <= 1) {
      addToSeenBefore(seenBefore, 0, i);
      nums.push(0);
      // console.log(`Turn ${i + 1} says 0`);
    } else {
      const indicesOfLastNumber = seenBefore[lastNumber];
      const lastSpoken = indicesOfLastNumber[indicesOfLastNumber.length - 1];
      const secondToLastSpoken =
        indicesOfLastNumber[indicesOfLastNumber.length - 2];
      currentNumber = lastSpoken - secondToLastSpoken;
      // console.log(`Turn ${i + 1} says ${currentNumber}`);
      addToSeenBefore(seenBefore, currentNumber, i);
      nums.push(currentNumber);
    }
  }
  console.log(currentNumber);
}

function addToSeenBefore(seenBefore, key, value) {
  if (!seenBefore[key.toString()]) {
    seenBefore[key] = [value];
  } else if (seenBefore[key.toString()].length === 1) {
    seenBefore[key].push(value);
  } else {
    seenBefore[key].shift();
    seenBefore[key].push(value);
  }
}

part1();
