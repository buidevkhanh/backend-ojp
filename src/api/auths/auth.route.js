"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var auth_validation_1 = require("./auth.validation");
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var auth_controller_1 = __importDefault(require("./auth.controller"));
var _router = express_1.default.Router();
_router.post('/auths/signin', [
    (0, validate_mdw_1.validate)(auth_validation_1.loginValidation),
    auth_controller_1.default.userSignin,
]);
_router.post('/auths/signup', [
    (0, validate_mdw_1.validate)(auth_validation_1.regisValidation),
    auth_controller_1.default.userSignup,
]);
exports.name = 'auths';
exports.default = _router;
