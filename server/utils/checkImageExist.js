const fs = require("fs");
const path = require("path");

const checkImageExists = (image) => {
  const imagePath = path.join(__dirname, "../public", "images", image);
  const exists = fs.existsSync(imagePath);
  return exists;
}

module.exports = checkImageExists;