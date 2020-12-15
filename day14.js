const readFile = require("./fileUtil");

function part1() {
  const data = readFile("day14.txt");

  // location: value
  const memory = {};

  let currentMask = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i].startsWith("mask")) {
      currentMask = data[i].substring(7);
      console.log(currentMask);
    } else {
      const memoryLocation = parseInt(
        data[i].match(/mem\[(?<loc>\d+)/).groups.loc
      );
      const decimalValue = parseInt(data[i].split("=")[1].trim());
      const memoryValueArr = decimalValue
        .toString(2)
        .padStart(36, "0")
        .split("");

      currentMask.split("").forEach((x, index) => {
        if (x === "X") {
          return;
        }
        memoryValueArr[index] = x;
      });

      memory[memoryLocation] = parseInt(memoryValueArr.join(""), 2);
    }
  }

  console.log(Object.values(memory).reduce((acc, value) => acc + value));
}

function part2() {
  const data = readFile("day14.txt");

  const memory = {};

  let currentMask = "";
  let indicesOfX = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].startsWith("mask")) {
      currentMask = data[i].substring(7);
      indicesOfX = [];
      for (let j = 0; j < currentMask.split("").length; j++) {
        if (currentMask.split("")[j] === "X") {
          indicesOfX.push(j);
        }
      }
    } else {
      const value = parseInt(data[i].split("=")[1].trim());

      const initialMemoryLocation = parseInt(
        data[i].match(/mem\[(?<loc>\d+)/).groups.loc
      );
      const memoryLocationStr = initialMemoryLocation
        .toString(2)
        .padStart(36, "0");

      let memoryLocationArr = memoryLocationStr.split("");
      currentMask.split("").forEach((x, index) => {
        if (x === "1") {
          memoryLocationArr[index] = "1";
        }
      });

      for (let j = 0; j < Math.pow(2, indicesOfX.length); j++) {
        const addressValuesToChange = j
          .toString(2)
          .padStart(indicesOfX.length, "0")
          .split("");
        for (let k = 0; k < indicesOfX.length; k++) {
          memoryLocationArr[indicesOfX[k]] = addressValuesToChange[k];
        }
        const newMemoryLocation = parseInt(memoryLocationArr.join(""), 2);
        memory[newMemoryLocation] = value;
      }
    }
  }
  console.log(Object.values(memory).reduce((acc, value) => acc + value));
}

part2();
