const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public", "images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const checkFileImage = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|png|gif|jepg)$/)) {
    cb(new Error("file ảnh không hợp lệ"));
  } else {
    cb(null, true);
  }
};
const upload = multer({ storage: storage, fileFilter: checkFileImage });

module.exports = upload;