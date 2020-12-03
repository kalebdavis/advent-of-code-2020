var readFile = require("./fileUtil");

let FOREST_WIDTH;
let FOREST_HEIGHT;
let SLOPE_X;
let SLOPE_Y;

function part1() {
  const trees = readDataIntoTreesMap(readFile("day3.txt"));

  let numTrees = 0;
  let currentX = 0;
  for (let i = 0; i < FOREST_HEIGHT; i += SLOPE_Y) {
    if (trees[i].includes(currentX % FOREST_WIDTH)) {
      numTrees++;
    }
    currentX += SLOPE_X;
  }
  return numTrees;
}

function readDataIntoTreesMap(data) {
  const trees = {};
  FOREST_HEIGHT = data.length;
  data.forEach((line, yIndex) => {
    line = line.split("");
    FOREST_WIDTH = line.length;
    trees[yIndex] = [];
    line.forEach((entry, xIndex) => {
      if (entry === "#") {
        trees[yIndex].push(xIndex);
      }
    });
  });
  return trees;
}

function part2() {
  const X_SLOPES = [1, 3, 5, 7, 1];
  const Y_SLOPES = [1, 1, 1, 1, 2];

  let result = 1;
  for (let slopeIndex = 0; slopeIndex < X_SLOPES.length; slopeIndex++) {
    SLOPE_X = X_SLOPES[slopeIndex];
    SLOPE_Y = Y_SLOPES[slopeIndex];

    result *= part1();
  }
  console.log(result);
}

part2();
