const readFile = require("./fileUtil");

function part1() {
  const data = readFile("day5.txt");
  // R = 1, L = 0
  // F = 0, B = 1

  let maxId = -Infinity;
  data.forEach((ticket) => {
    const row = ticket.substring(0, 7).replace(/F/g, "0").replace(/B/g, "1");
    const column = ticket.substring(7).replace(/R/g, "1").replace(/L/g, "0");

    const rowDecimal = parseInt(row, 2);
    const columnDecimal = parseInt(column, 2);
    const seatId = rowDecimal * 8 + columnDecimal;
    console.log(seatId);
    maxId = Math.max(maxId, seatId);
  });
  console.log(maxId);
}

function part2() {
  const data = readFile("day5.txt");

  const seatIds = [];
  data.forEach((ticket) => {
    const row = ticket.substring(0, 7).replace(/F/g, "0").replace(/B/g, "1");
    const column = ticket.substring(7).replace(/R/g, "1").replace(/L/g, "0");

    const rowDecimal = parseInt(row, 2);
    const columnDecimal = parseInt(column, 2);
    const seatId = rowDecimal * 8 + columnDecimal;
    seatIds.push(seatId);
  });
  seatIds.sort(function (a, b) {
    return a - b;
  });
  for (let i = 0; i < seatIds.length - 1; i++) {
    if (seatIds[i + 1] - seatIds[i] > 1) {
      console.log(seatIds[i] + 1);
    }
  }
}

part2();
