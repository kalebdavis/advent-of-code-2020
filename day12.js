const readFile = require("./fileUtil");

const DIRECTIONS = ["N", "E", "S", "W"];
const LEFT_DIRECTIONS = ["N", "W", "S", "E"];

function part1() {
  const instructions = readFile("day12.txt");
  const currentLocation = {
    x: 0,
    y: 0,
    dir: "E",
  };

  instructions.forEach((instruction) => {
    let action = instruction.split("")[0];
    const num = parseInt(instruction.substring(1));

    if (action === "F") {
      action = currentLocation.dir;
    }

    switch (action) {
      case "N":
        moveNorth(currentLocation, num);
        break;
      case "S":
        moveSouth(currentLocation, num);
        break;
      case "E":
        moveEast(currentLocation, num);
        break;
      case "W":
        moveWest(currentLocation, num);
        break;
      case "L":
        turnLeft(currentLocation, num);
        break;
      case "R":
        turnRight(currentLocation, num);
        break;
      case "F":
        console.log("Should not be F");
        break;
      default:
        console.log(action);
        console.log(instruction);
        console.log("Unknown action");
    }
  });
  console.log(Math.abs(currentLocation.x) + Math.abs(currentLocation.y));
}

function part2() {
  const instructions = readFile("day12.txt");
  const currentLocation = {
    x: 0,
    y: 0,
    dir: "E",
  };
  const waypointLocation = {
    x: 10,
    y: 1,
  };

  instructions.forEach((instruction) => {
    let action = instruction.split("")[0];
    const num = parseInt(instruction.substring(1));

    switch (action) {
      case "N":
        moveWaypointNorth(waypointLocation, num);
        break;
      case "S":
        moveWaypointSouth(waypointLocation, num);
        break;
      case "E":
        moveWaypointEast(waypointLocation, num);
        break;
      case "W":
        moveWaypointWest(waypointLocation, num);
        break;
      case "L":
        rotateWaypointLeft(waypointLocation, num);
        break;
      case "R":
        rotateWaypointRight(waypointLocation, num);
        break;
      case "F":
        moveTowardsWaypoint(currentLocation, waypointLocation, num);
        break;
      default:
        console.log("Unknown action");
    }
  });
  console.log(Math.abs(currentLocation.x) + Math.abs(currentLocation.y));
}

function moveWaypointNorth(waypointLocation, num) {
  waypointLocation.y += num;
}

function moveWaypointSouth(waypointLocation, num) {
  waypointLocation.y -= num;
}

function moveWaypointEast(waypointLocation, num) {
  waypointLocation.x += num;
}

function moveWaypointWest(waypointLocation, num) {
  waypointLocation.x -= num;
}

function rotateWaypointLeft(waypointLocation, degrees) {
  const numTimes = degrees / 90;
  for (let i = 0; i < numTimes; i++) {
    const currentX = waypointLocation.x;
    const currentY = waypointLocation.y;

    waypointLocation.y = currentX;
    waypointLocation.x = currentY * -1;
  }
}

function rotateWaypointRight(waypointLocation, degrees) {
  const numTimes = degrees / 90;
  for (let i = 0; i < numTimes; i++) {
    const currentX = waypointLocation.x;
    const currentY = waypointLocation.y;

    waypointLocation.x = currentY;
    waypointLocation.y = currentX * -1;
  }
}

function moveTowardsWaypoint(currentLocation, waypointLocation, num) {
  currentLocation.x += waypointLocation.x * num;
  currentLocation.y += waypointLocation.y * num;
}

function moveNorth(currentLocation, num) {
  currentLocation.y += num;
}

function moveSouth(currentLocation, num) {
  currentLocation.y -= num;
}

function moveEast(currentLocation, num) {
  currentLocation.x += num;
}

function moveWest(currentLocation, num) {
  currentLocation.x -= num;
}

function turnRight(currentLocation, num) {
  const currentDirectionIndex = DIRECTIONS.indexOf(currentLocation.dir);
  const numTurns = num / 90;
  const newIndex = (currentDirectionIndex + numTurns) % DIRECTIONS.length;
  currentLocation.dir = DIRECTIONS[newIndex];
}

function turnLeft(currentLocation, num) {
  const currentDirectionIndex = LEFT_DIRECTIONS.indexOf(currentLocation.dir);
  const numTurns = num / 90;
  const newIndex = (currentDirectionIndex + numTurns) % LEFT_DIRECTIONS.length;
  currentLocation.dir = LEFT_DIRECTIONS[newIndex];
}

part2();
