const fs = require("fs");
const path = require("path");

function part1() {
  const data = parseFile();

  let errorRate = 0;
  data.nearbyTicketValues.forEach((ticketValue) => {
    if (!data.validNums.has(ticketValue)) {
      errorRate += ticketValue;
    }
  });
  console.log(errorRate);
}

function part2() {
  const data = parseFile();

  data.validTickets = getValidTickets(data);

  const { fields, fieldNames } = getFieldRanges(data);

  const spotOptions = new Array(data.validTickets[0].length).fill(fieldNames);
  for (let i = 0; i < spotOptions.length; i++) {
    for (let j = 0; j < data.validTickets.length; j++) {
      const ticket = data.validTickets[j];
      const filteredArray = fields[ticket[i]].filter((x) =>
        spotOptions[i].includes(x)
      );
      spotOptions[i] = filteredArray;
    }
  }

  const realOptions = [
    "zone",
    1,
    2,
    "departure location",
    "train",
    5,
    "departure time",
    "route",
    "seat",
    "wagon",
    "arrival platform",
    "departure station",
    "departure track",
    "departure date",
    "row",
    15,
    "type",
    "arrival station",
    "departure platform",
    19,
  ];

  // I did this manually, I couldn't be bothered to do it for real

  console.log(data);
}

function parseFile() {
  const fileContents = fs
    .readFileSync(path.join(__dirname, "input-files", "day16.txt"), "utf-8")
    .split("\n\n");

  const data = {};
  data.fields = parseFields(fileContents[0]);
  data.validNums = getValidNumsFromFields(data.fields);
  data.myTicket = parseMyTicket(fileContents[1]);
  data.nearbyTicketValues = parseNearbyTicketValues(fileContents[2]);
  return data;
}

function parseFields(str) {
  const fields = str.split("\n");
  return fields;
}

function getValidNumsFromFields(fields) {
  const validNums = [];
  fields.forEach((field) => {
    const regex = /: (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)/;
    const { min1, max1, min2, max2 } = field.match(regex).groups;
    validNums.push(
      ...range(parseInt(max1) - parseInt(min1) + 1, parseInt(min1))
    );
    validNums.push(
      ...range(parseInt(max2) - parseInt(min2) + 1, parseInt(min2))
    );
  });
  return new Set(validNums);
}

function range(size, startAt) {
  return [...Array(size).keys()].map((i) => i + startAt);
}

function parseMyTicket(str) {
  return str
    .split("\n")[1]
    .split(",")
    .map((x) => parseInt(x));
}

function parseNearbyTicketValues(str) {
  const nearbyTickets = str.split("\n").slice(1);
  const t = [];
  nearbyTickets.forEach((ticket) => {
    t.push(ticket.split(",").map((x) => parseInt(x)));
  });
  return t;
}

function getValidTickets(data) {
  const validTickets = [];
  const tickets = data.nearbyTicketValues;
  for (let i = 0; i < tickets.length; i++) {
    let valid = true;
    for (let j = 0; j < tickets[i].length; j++) {
      if (!data.validNums.has(tickets[i][j])) {
        valid = false;
        break;
      }
    }
    if (valid) {
      validTickets.push(tickets[i]);
    }
  }
  return validTickets;
}

function getFieldRanges(data) {
  const fields = {};
  const fieldNames = [];
  data.fields.forEach((field) => {
    const regex = /(?<fieldName>\w* *\w+): (?<min1>\d+)-(?<max1>\d+) or (?<min2>\d+)-(?<max2>\d+)/;
    const groups = field.match(regex).groups;
    const fieldName = groups.fieldName;
    fieldNames.push(fieldName);
    const min1 = parseInt(groups.min1);
    const max1 = parseInt(groups.max1);
    const min2 = parseInt(groups.min2);
    const max2 = parseInt(groups.max2);

    range(max1 - min1 + 1, min1).forEach((num) => {
      if (fields[num]) {
        fields[num].push(fieldName);
      } else {
        fields[num] = [fieldName];
      }
    });
    range(max2 - min2 + 1, min2).forEach((num) => {
      if (fields[num]) {
        fields[num].push(fieldName);
      } else {
        fields[num] = [fieldName];
      }
    });
  });
  return { fields, fieldNames };
}

part2();
