const multer = require("multer");

const storageConfig = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads");
  //   },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split(".")[1];
    const filenameWithExtension = `${file.fieldname}-${uniqueSuffix}.${fileExtension}`;
    cb(null, filenameWithExtension);
  },
});

const fileFilterConfig = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = { storageConfig, fileFilterConfig };
