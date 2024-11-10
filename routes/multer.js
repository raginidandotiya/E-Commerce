const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images'); // Corrected `path` to `cb`
    },
    filename: (req, file, cb) => {
        var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        var fn = `${uuidv4()}${ext}`;
        cb(null, fn); // Corrected `path` to `cb`
    }
});

var upload = multer({ storage: storage });

module.exports = upload;
