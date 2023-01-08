"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
var express_1 = __importDefault(require("express"));
var multer_service_1 = __importDefault(require("./multer.service"));
var upload_controller_1 = __importDefault(require("./upload.controller"));
var _router = express_1.default.Router();
_router.post('/single-upload', [
    multer_service_1.default.single('image'),
    upload_controller_1.default.singleUpload,
]);
exports.name = 'uploads';
exports.default = _router;
