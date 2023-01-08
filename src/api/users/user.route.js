"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("./user.controller"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var user_validation_1 = require("./user.validation");
var _router = express_1.default.Router();
_router.get('/insert-data/user', [user_controller_1.default.autoInsert]);
_router.get('/admin/info', [validate_mdw_1.loginRequire, validate_mdw_1.adminRole, user_controller_1.default.getAdminInfo]);
_router.get('/admin/statistic', [validate_mdw_1.loginRequire, validate_mdw_1.adminRole, user_controller_1.default.adminStatistic]);
_router.post('/users/active', [
    (0, validate_mdw_1.validate)(user_validation_1.activeUser),
    user_controller_1.default.activeUser,
]);
_router.post('/users/resend-code', [
    (0, validate_mdw_1.validate)(user_validation_1.resendCode),
    user_controller_1.default.resendCode,
]);
_router.get('/user', [
    validate_mdw_1.loginRequire,
    user_controller_1.default.getUserInfor
]);
_router.patch('/user', [validate_mdw_1.loginRequire, user_controller_1.default.userUpdateInfo]);
_router.get('/user/ranking', user_controller_1.default.getTopTen);
_router.get('/user/ranking/me', [validate_mdw_1.loginRequire, user_controller_1.default.userGetRanking]);
exports.name = 'users';
exports.default = _router;
