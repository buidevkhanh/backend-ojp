"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var admin_controller_1 = __importDefault(require("./admin.controller"));
var admin_validate_1 = require("./admin.validate");
var _router = express_1.default.Router();
_router.post('/admin/sign-in', [(0, validate_mdw_1.validate)(admin_validate_1.adminLogin), admin_controller_1.default.signIn]);
exports.name = 'admins';
exports.default = _router;
