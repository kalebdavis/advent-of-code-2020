const fs = require("fs");
const path = require("path");

function part1() {
  const data = parseAnswersFromFile();
  let sum = 0;

  data.forEach((group) => {
    sum += new Set(group.split("")).size;
  });
  console.log(sum);
}

function part2() {
  const data = parseAnswersFromFile();
  let sum = 0;

  data.forEach((group) => {
    const answersByGroupMember = group.split("\n");
    const dic = {};

    answersByGroupMember.forEach((value, index) => {
      const answers = value.split("");
      answers.forEach((value) => {
        if (Object.keys(dic).includes(value)) {
          dic[value] = dic[value] + 1;
        } else {
          dic[value] = 1;
        }
      });
    });

    Object.values(dic).forEach((val) => {
      if (val === answersByGroupMember.length) {
        sum++;
      }
    });
  });

  console.log(sum);
  console.log("here");
}

function parseAnswersFromFile() {
  return fs
    .readFileSync(path.join(__dirname, "input-files", "day6.txt"), "utf-8")
    .split("\n\n");
}

part2();
