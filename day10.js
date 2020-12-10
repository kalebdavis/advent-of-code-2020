const readFile = require("./fileUtil");

function part1() {
  const data = getList();

  let num1 = 0;
  let num3 = 0;

  for (let i = 0; i < data.length - 1; i++) {
    console.log(`comparing ${data[i]} to ${data[i + 1]}`);
    const difference = data[i + 1] - data[i];
    if (difference === 1) {
      num1++;
    } else if (difference === 3) {
      num3++;
    } else if (difference > 3) {
      console.err("Difference greater, cannot use this adapter");
    }
  }
  console.log(num1);
  console.log(num3);
  console.log(num1 * num3);
}

function part2() {
  const adapters = getList();
  const counts = { 0: 1 };

  for (let i = 0; i < adapters.length; i++) {
    const adapter = adapters[i];
    addToMap(counts, adapter, adapter + 1);
    addToMap(counts, adapter, adapter + 2);
    addToMap(counts, adapter, adapter + 3);
  }
  console.log(counts[adapters[adapters.length - 1]]);
}

function addToMap(counts, adapter, nextAdapter) {
  if (!Object.keys(counts).includes(nextAdapter.toString())) {
    counts[nextAdapter] = counts[adapter];
  } else {
    counts[nextAdapter] += counts[adapter];
  }
}

function getList() {
  const data = readFile("day10.txt")
    .map((x) => parseInt(x))
    .sort((a, b) => a - b);
  data.unshift(0);
  data.push(data[data.length - 1] + 3);
  console.log(`Starting with list ${data}`);

  return data;
}

part2();
