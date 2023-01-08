"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_error_1 = require("../../libs/errors/app.error");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "".concat(__dirname, "/../../uploads/"));
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype.includes('image')) {
        cb(null, true);
    }
    else {
        cb(new app_error_1.AppError('UnsupportedFileFormat', 400), false);
    }
};
var upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter,
});
exports.default = upload;
