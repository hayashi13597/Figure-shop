const fs = require("fs");
const path = require("path");

const unlink = (image) => {
  fs.unlink(path.join(__dirname, "../public", "images", image), (err) => {
    if (err) throw err;
  });
};

module.exports = unlink;