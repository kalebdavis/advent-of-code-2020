const readFile = require("./fileUtil");

function part1() {
  const data = readFile("day13.txt");
  const goalNum = parseInt(data[0]);
  const buses = data[1]
    .split(",")
    .filter((bus) => {
      return bus !== "x";
    })
    .map((bus) => {
      return parseInt(bus);
    });

  const busToTake = {
    busId: 0,
    difference: Infinity,
  };
  for (let i = 0; i < buses.length; i++) {
    const closestDepartingTime = Math.ceil(goalNum / buses[i]) * buses[i];
    const difference = closestDepartingTime - goalNum;
    if (difference < busToTake.difference) {
      busToTake.busId = buses[i];
      busToTake.difference = difference;
    }
  }

  console.log(busToTake.busId * busToTake.difference);
}

/*
 ** Example (from PillarsBliz here: https://www.reddit.com/r/adventofcode/comments/kc60ri/2020_day_13_can_anyone_give_me_a_hint_for_part_2/):
 **
 ** Previous bus is 7, this bus is 13, with delay +1.
 ** A time T is needed such that:
 **      7x == T
 **     13y == (T + 1)
 **
 ** Performing an iterative search for T on multiples of 7 and checking (T + 1)
 ** eventually reveals that:
 **   (7 * 11) == 77
 **   (13 * 6) == 78
 **
 ** To find further times that match this condition, imagine some value W added to T.
 **    7j == T + W
 **   13k == (T + 1) + W
 ** Substituting:
 **    7j == 7x + W,  and j == x + (W / 7)
 **   13k == 13y + W, and k == y + (W / 13)
 ** For j and k to be integers, since x and y are integers, W must be a multiple of both 7 and 13.
 ** Since all input numbers are conveniently prime, the smallest multiple of both 7 and 13 is (7 * 13).
 ** Thus, W == (7 * 13) == 91.
 **
 **
 ** Next, a time T is needed such that:
 **      7x == T
 **     13y == (T + 1)
 **     59z == (T + 4)
 **
 ** Performing an iterative search from 77, adding multiples of 91, eventually reveals that:
 **    (7 * 50) == 350
 **   (13 * 27) == 351
 **    (59 * 6) == 354
 **
 ** As above, the next T that matches this condition would be 350 + (7 * 13 * 59) == 350 + (5369) == 5719.
 */

function part2() {
  const data = readFile("day13.txt");
  const buses = [];
  data[1].split(",").forEach((bus, index) => {
    if (bus !== "x") {
      buses.push({
        busId: parseInt(bus),
        index: index,
      });
    }
  });

  let t = buses[0].busId;

  let i = buses[0].busId;

  let currentIndex = 1;
  while (currentIndex < buses.length) {
    const remainder =
      (i + buses[currentIndex].index) % buses[currentIndex].busId;
    if (remainder === 0) {
      t *= buses[currentIndex].busId;
      currentIndex++;
    } else {
      i += t;
    }
  }

  console.log(i);
}

part2();
