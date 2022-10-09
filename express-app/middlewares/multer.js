const util = require("util");
const multer = require("multer");
const path = require('path');
const maxSize = 2 * 1024 * 1024; // 2 MB

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, 'user1'+Date.now()+path.extname(file.originalname));
    // cb(null, 'test'+ path.extname(file.originalname));
    // cb(null,file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;