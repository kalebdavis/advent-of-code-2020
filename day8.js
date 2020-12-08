const readFile = require("./fileUtil");

function part1() {
  const instructionList = buildInstructionList();
  let acc = 0;
  let pointer = 0;
  let cont = true;

  while (cont) {
    let currentInstruction = instructionList[pointer];
    console.log(currentInstruction.instruction);
    if (currentInstruction.timesSeen > 0) {
      cont = false;
      break;
    }
    currentInstruction.timesSeen++;
    switch (currentInstruction.instruction) {
      case "nop":
        pointer++;
        break;
      case "acc":
        acc += currentInstruction.number;
        pointer++;
        break;
      case "jmp":
        pointer += currentInstruction.number;
        break;
    }
  }
  console.log(acc);
}

function part2() {
  const numInstructions = buildInstructionList().length;

  for (let i = 0; i < numInstructions; i++) {
    const instructions = buildInstructionList();
    let instruction = instructions[i];
    if (instruction.instruction === "nop") {
      instruction.instruction = "jmp";
    } else if (instruction.instruction === "jmp") {
      instruction.instruction = "nop";
    }

    let acc = 0;
    let pointer = 0;
    let cont = true;
    let done = false;

    while (cont && !done) {
      let currentInstruction = instructions[pointer];
      if (currentInstruction.timesSeen > 0) {
        cont = false;
        break;
      }
      currentInstruction.timesSeen++;
      switch (currentInstruction.instruction) {
        case "nop":
          pointer++;
          break;
        case "acc":
          acc += currentInstruction.number;
          pointer++;
          break;
        case "jmp":
          pointer += currentInstruction.number;
          break;
      }
      if (pointer >= numInstructions) {
        done = true;
      }
    }

    if (done) {
      console.log("Done: " + acc);
    }
  }
}

function buildInstructionList() {
  const regexp = /(?<instruction>\w+) (?<number>(\+|-)\d+)/;
  const instructionList = readFile("day8.txt").map((line) => {
    const match = line.match(regexp);
    return {
      instruction: match.groups.instruction,
      number: parseInt(match.groups.number),
      timesSeen: 0,
    };
  });
  return instructionList;
}

part2();
