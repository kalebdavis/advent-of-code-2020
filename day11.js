const readFile = require("./fileUtil");

let WIDTH;
let HEIGHT;
let SEAT_LOCATIONS = [];
const SEATING_MAPS = [];

function part1() {
  SEATING_MAPS.push(buildSeatingMap());
  let done = false;
  // prettyPrint(SEATING_MAPS[0]);
  while (!done) {
    done = move(SEATING_MAPS.length);
    // prettyPrint(SEATING_MAPS[SEATING_MAPS.length - 1]);
  }
  console.log(countOccupied(SEATING_MAPS[SEATING_MAPS.length - 1]));
}

function countOccupied(map) {
  let numOccupied = 0;
  SEAT_LOCATIONS.forEach((seat) => {
    if (map[seat] === "#") {
      numOccupied++;
    }
  });
  return numOccupied;
}

function move(currentRound) {
  const newSeatingMap = {};
  let numChanges = 0;
  SEAT_LOCATIONS.forEach((seatLocation) => {
    const adjacentOccupied = calculateAdjacentOccupied(
      currentRound,
      seatLocation
    );
    if (
      SEATING_MAPS[currentRound - 1][seatLocation] === "L" &&
      adjacentOccupied === 0
    ) {
      newSeatingMap[seatLocation] = "#";
      numChanges++;
    } else if (
      SEATING_MAPS[currentRound - 1][seatLocation] === "#" &&
      adjacentOccupied >= 5
    ) {
      newSeatingMap[seatLocation] = "L";
      numChanges++;
    } else {
      newSeatingMap[seatLocation] =
        SEATING_MAPS[currentRound - 1][seatLocation];
    }
  });
  SEATING_MAPS.push(newSeatingMap);
  return numChanges === 0;
}

function isAdjacentOccupied(currentRound, currentSeatLocation, direction) {
  let x = parseKey(currentSeatLocation).x;
  let y = parseKey(currentSeatLocation).y;

  switch (direction) {
    case "NORTH":
      y--;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          y--;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "NORTHEAST":
      x++;
      y--;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x++;
          y--;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "EAST":
      x++;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x++;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "SOUTHEAST":
      x++;
      y++;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x++;
          y++;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "SOUTH":
      y++;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          y++;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "SOUTHWEST":
      x--;
      y++;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x--;
          y++;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "WEST":
      x--;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x--;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    case "NORTHWEST":
      x--;
      y--;
      while (true) {
        if (!SEATING_MAPS[currentRound - 1][makeKey(x, y)]) {
          return false;
        } else if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === ".") {
          x--;
          y--;
        } else {
          if (SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "L") {
            return false;
          }
          return true;
        }
      }
    default:
      console.log("Unknown direction");
  }
}

function calculateAdjacentOccupied(currentRound, seatLocation) {
  x = parseKey(seatLocation).x;
  y = parseKey(seatLocation).y;

  let count = 0;

  // north
  if (isAdjacentOccupied(currentRound, seatLocation, "NORTH")) {
    count++;
  }
  // northeast
  if (isAdjacentOccupied(currentRound, seatLocation, "NORTHEAST")) {
    count++;
  }
  // east
  if (isAdjacentOccupied(currentRound, seatLocation, "EAST")) {
    count++;
  }
  // southeast
  if (isAdjacentOccupied(currentRound, seatLocation, "SOUTHEAST")) {
    count++;
  }
  // south
  if (isAdjacentOccupied(currentRound, seatLocation, "SOUTH")) {
    count++;
  }
  // southwest
  if (isAdjacentOccupied(currentRound, seatLocation, "SOUTHWEST")) {
    count++;
  }
  // west
  if (isAdjacentOccupied(currentRound, seatLocation, "WEST")) {
    count++;
  }
  // northwest
  if (isAdjacentOccupied(currentRound, seatLocation, "NORTHWEST")) {
    count++;
  }
  return count;
}

// function isAdjacentOccupied(currentRound, x, y) {
//   if (
//     SEATING_MAPS[currentRound - 1][makeKey(x, y)] &&
//     SEATING_MAPS[currentRound - 1][makeKey(x, y)] === "#"
//   ) {
//     return true;
//   }
//   return false;
// }

function buildSeatingMap() {
  const data = readFile("day11.txt");
  HEIGHT = data.length;
  WIDTH = data[0].length;

  const seatingMap = {};

  data.forEach((line, index) => {
    const seats = line.split("");
    seats.forEach((seat, seatIndex) => {
      seatingMap[makeKey(seatIndex, index)] = seat;
      SEAT_LOCATIONS.push(makeKey(seatIndex, index));
    });
  });
  return seatingMap;
}

function makeKey(x, y) {
  return `${x},${y}`;
}

function parseKey(key) {
  return {
    x: parseInt(key.split(",")[0]),
    y: parseInt(key.split(",")[1]),
  };
}

function prettyPrint(map) {
  const arr = [];
  for (let i = 0; i < HEIGHT; i++) {
    const inArr = [];
    for (let j = 0; j < WIDTH; j++) {
      inArr.push(map[makeKey(j, i)]);
    }
    arr.push(inArr);
  }
  console.table(arr);
}

part1();
