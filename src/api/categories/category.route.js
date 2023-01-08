"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var validate_mdw_2 = require("../../libs/middlewares/validate.mdw");
var category_controller_1 = __importDefault(require("./category.controller"));
var category_validation_1 = require("./category.validation");
var _router = express_1.default.Router();
_router.post('/admin/category', [
    (0, validate_mdw_2.validate)(category_validation_1.createCategory),
    category_controller_1.default.createCategory,
]);
_router.patch('/admin/category', [
    (0, validate_mdw_2.validate)(category_validation_1.updateCategory),
    category_controller_1.default.updateCategory,
]);
_router.delete('/admin/category/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    category_controller_1.default.deleteCategory,
]);
_router.get('/admin/category/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    category_controller_1.default.categoryDetail,
]);
_router.patch('/admin/category/:id/status', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    category_controller_1.default.switchStatus,
]);
_router.get('/category', [category_controller_1.default.getAllActive]);
_router.get('/admin/category', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    category_controller_1.default.getAll,
]);
exports.name = 'categories';
exports.default = _router;
