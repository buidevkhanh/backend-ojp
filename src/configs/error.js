"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_error_1 = require("../libs/errors/app.error");
function default_1(app) {
    app.use(function (error, req, res, next) {
        if (!(error instanceof app_error_1.AppError))
            error = new app_error_1.AppError("An error occurred, please check again", 400);
        else res.status(error.code || 500).json(error.jsonDetail());
    });
}
exports.default = default_1;
