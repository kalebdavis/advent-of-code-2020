const readFile = require("./fileUtil");

const BAG_MAP = {};

function part1() {
  const data = readFile("day7.txt");

  data.forEach((bagLine) => {
    const goalBag = getFirstBag(bagLine);
    const containingBags = getContainingBags(bagLine);

    BAG_MAP[goalBag] = containingBags;
  });

  const bagColors = Object.keys(BAG_MAP);

  let count = 0;

  for (let index in bagColors) {
    console.log(`Starting count bags, current color: ${bagColors[index]}`);
    if (countBags(bagColors[index], []).length > 0) {
      count++;
    }
  }

  console.log(count);
}

function countBags(rootBagColor, shinyBags) {
  if (!Object.keys(BAG_MAP).includes(rootBagColor)) {
    return shinyBags;
  }
  const innerBags = BAG_MAP[rootBagColor];
  for (let i = 0; i < innerBags.length; i++) {
    if (innerBags[i].bagColor === "shiny gold") {
      shinyBags.push(innerBags[i].number);
    } else {
      countBags(innerBags[i].bagColor, shinyBags);
    }
  }
  return shinyBags;
}

function part2() {
  const data = readFile("day7.txt");

  data.forEach((bagLine) => {
    const goalBag = getFirstBag(bagLine);
    const containingBags = getContainingBags(bagLine);

    BAG_MAP[goalBag] = containingBags;
  });

  const result = countBagsInsideShinyBag({ bagColor: "shiny gold", number: 1 });
  console.log(result - 1);
}

function countBagsInsideShinyBag(currentBag) {
  let total = 1;
  const innerBags = BAG_MAP[currentBag.bagColor];
  if (innerBags.length !== 0) {
    for (let i = 0; i < innerBags.length; i++) {
      total += innerBags[i].number * countBagsInsideShinyBag(innerBags[i]);
    }
  }
  return total;
}

function getFirstBag(bagLine) {
  const regexp = /(\w+ \w+) bags* contain/;
  const matches = bagLine.match(regexp);
  return matches[1];
}

function getContainingBags(bagLine) {
  const regexp = /(?<number>\d) (?<bagColor>\w+ \w+) bags*/g;
  const matches = bagLine.matchAll(regexp);

  return [...matches].map((match) => {
    return {
      number: parseInt(match.groups.number),
      bagColor: match.groups.bagColor,
    };
  });
}

part2();
