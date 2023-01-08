"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var submission_controller_1 = __importDefault(require("./submission.controller"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var _router = express_1.default.Router();
_router.get('/submission', [validate_mdw_1.bypassLogin, submission_controller_1.default.getSubmission]);
_router.get('/submission/:id', [validate_mdw_1.bypassLogin, submission_controller_1.default.detail]);
_router.get('/admin/submission', [validate_mdw_1.loginRequire, validate_mdw_1.adminRole, submission_controller_1.default.adminList]);
_router.delete('/admin/:id/submission', [validate_mdw_1.loginRequire, validate_mdw_1.adminRole, submission_controller_1.default.removeSubmission]);
exports.name = 'submissions';
exports.default = _router;
