const fs = require("fs");
const path = require("path");

const REQUIRED_FIELDS = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  "cid",
];

function part1() {
  const passports = parsePassportsFromFile();

  let validPassports = 0;

  passports.forEach((passport) => {
    const fields = passport.split(" ");
    const keysInPassport = [];
    fields.forEach((field) => {
      keysInPassport.push(field.split(":")[0]);
    });
    let valid = true;
    REQUIRED_FIELDS.forEach((requiredField) => {
      if (!keysInPassport.includes(requiredField)) {
        if (requiredField !== "cid") {
          valid = false;
          return;
        }
      }
    });
    if (valid) {
      validPassports++;
    }
  });

  console.log(validPassports);
}

function part2() {
  const passports = parsePassportsFromFile();
  let validPassports = 0;

  passports.forEach((passportStr) => {
    const passport = buildPassportObjectFromString(passportStr);
    const valid = validatePassport(passport);
    if (valid) {
      validPassports++;
    }
  });
  console.log(validPassports);
}

function parsePassportsFromFile() {
  return fs
    .readFileSync(path.join(__dirname, "input-files", "day4.txt"), "utf-8")
    .split("\n\n")
    .map((line) => {
      return line.replace(/\n/g, " ");
    });
}

function buildPassportObjectFromString(passportString) {
  const passport = {};
  passportString.split(" ").forEach((keyValue) => {
    passport[keyValue.split(":")[0]] = keyValue.split(":")[1];
  });
  return passport;
}

function validatePassport(passport) {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    const field = REQUIRED_FIELDS[i];
    if (field !== "cid" && !Object.keys(passport).includes(field)) {
      return false;
    }

    switch (field) {
      case "byr":
        if (!validateYearBetween(passport["byr"], 1920, 2002)) {
          return false;
        }
        break;
      case "iyr":
        if (!validateYearBetween(passport["iyr"], 2010, 2020)) {
          return false;
        }
        break;
      case "eyr":
        if (!validateYearBetween(passport["eyr"], 2020, 2030)) {
          return false;
        }
        break;
      case "hgt":
        if (!validateHeight(passport["hgt"])) {
          return false;
        }
        break;
      case "hcl":
        if (!validateHairColor(passport["hcl"])) {
          return false;
        }
        break;
      case "ecl":
        if (!validateEyeColor(passport["ecl"])) {
          return false;
        }
        break;
      case "pid":
        if (!validatePassportId(passport["pid"])) {
          return false;
        }
        break;
      case "cid":
        break;
      default:
        console.error("Unexpected field");
    }
  }
  return true;
}

function validateYearBetween(value, minYear, maxYear) {
  if (value.split("").length !== 4) {
    return false;
  }

  if (parseInt(value) < minYear || parseInt(value) > maxYear) {
    return false;
  }

  return true;
}

function validateHeight(value) {
  if (!value.endsWith("cm") && !value.endsWith("in")) {
    return false;
  }

  if (value.endsWith("cm")) {
    const cm = parseInt(value.split("c")[0]);
    if (cm < 150 || cm > 193) {
      return false;
    }
    return true;
  }

  if (value.endsWith("in")) {
    const inc = parseInt(value.split("i")[0]);
    if (inc < 59 || inc > 76) {
      return false;
    }
    return true;
  }
}

function validateHairColor(value) {
  return value.match(/^#[0-9a-z]{6}$/) !== null;
}

function validateEyeColor(value) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return validEyeColors.includes(value);
}

function validatePassportId(value) {
  return value.match(/^[0-9]{9}$/) !== null;
}

part2();
