var fs = require("fs");
var path = require("path");

module.exports = (filename) => {
  return fs
    .readFileSync(path.join(__dirname, "input-files", filename), "utf-8")
    .split("\n");
};
