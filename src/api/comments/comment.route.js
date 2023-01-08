"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var validate_mdw_1 = require("../../libs/middlewares/validate.mdw");
var comment_controller_1 = __importDefault(require("./comment.controller"));
var _router = express_1.default.Router();
_router.post('/comment', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.createComment]);
_router.patch('/comment', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.updateComment]);
_router.get('/comment/:id', [comment_controller_1.default.getComment]);
_router.delete('/comment/:id', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.removeComment]);
_router.post('/comment/reply', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.createReply]);
_router.patch('/comment/reply', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.updateReply]);
_router.delete('/comment/reply/:id', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.removeReply]);
_router.post('/comment/reaction', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.createReaction]);
_router.patch('/comment/reaction', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.updateReaction]);
_router.get('/comment/reaction/:id', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.getOwn]);
_router.get('/comment/reaction/problem/:id', [validate_mdw_1.loginRequire, validate_mdw_1.studentRole, comment_controller_1.default.getReaction]);
exports.name = 'comments';
exports.default = _router;