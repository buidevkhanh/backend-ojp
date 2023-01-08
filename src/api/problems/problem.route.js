"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var validate_mdw_2 = require("../../libs/middlewares/validate.mdw");
var problem_controller_1 = __importDefault(require("./problem.controller"));
var problem_validation_1 = require("./problem.validation");
var _router = express_1.default.Router();
_router.post('/admin/problem', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    (0, validate_mdw_2.validate)(problem_validation_1.createProblem),
    problem_controller_1.default.createProblem,
]);
_router.get('/admin/problem', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.getAllProblem,
]);
_router.patch('/admin/problem/:id/status', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.changeProblem,
]);
_router.delete('/admin/problem/testcase', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.deleteTestcase,
]);
_router.patch('/admin/problem/testcase/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.updateTestcase,
]);
_router.patch('/admin/problem/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.updateProblem,
]);
_router.get('/admin/problem/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.getDetail,
]);
_router.post('/admin/problem/testcase/:id', [
    validate_mdw_1.loginRequire,
    validate_mdw_1.adminRole,
    problem_controller_1.default.addTestcase,
]);
_router.get('/problem', [validate_mdw_1.bypassLogin, problem_controller_1.default.getActiveProblem]);
_router.get('/problem/detail', [problem_controller_1.default.getProblemDetail]);
_router.get('/problem/statistic', [problem_controller_1.default.statistic]);
exports.name = 'problems';
exports.default = _router;
