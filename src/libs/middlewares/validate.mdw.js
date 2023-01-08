"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupRole = exports.teacherRole = exports.studentRole = exports.adminRole = exports.loginRequire = exports.bypassLogin = exports.validate = void 0;
var app_object_1 = require("../../commons/app.object");
var jwt_1 = __importDefault(require("../../commons/jwt"));
var app_error_1 = require("../errors/app.error");
function validate(validationSchema) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var body, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = req.body;
                        return [4 /*yield*/, validationSchema.validateAsync(body)];
                    case 1:
                        _a.sent();
                        next();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(new app_error_1.AppError(error_1.details[0].message, 400));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
}
exports.validate = validate;
function bypassLogin(req, res, next) {
    try {
        var authToken = req.get('Authorization').split('Bearer ');
        if (authToken.length === 1) {
            req.payload = null;
        }
        else if (authToken.length === 2) {
            var token = authToken[1];
            try {
                var payload = jwt_1.default.verifyToken(token);
                req.payload = payload;
            }
            catch (error) {
                req.payload = null;
            }
        }
        else {
            req.payload = null;
        }
    }
    catch (error) {
        req.payload = null;
    }
    next();
}
exports.bypassLogin = bypassLogin;
function loginRequire(req, res, next) {
    try {
        var authToken = req.get('Authorization').split('Bearer ');
        if (authToken.length === 1) {
            next(new app_error_1.AppError('NotBearerToken', 400));
        }
        else if (authToken.length === 2) {
            var token = authToken[1];
            try {
                var payload = jwt_1.default.verifyToken(token);
                req.payload = payload;
                next();
            }
            catch (error) {
                next(new app_error_1.AppError(error.message, 400));
            }
        }
        else {
            next(new app_error_1.AppError('TokenFormatNotFound', 400));
        }
    }
    catch (error) {
        next(new app_error_1.AppError('Unauthorized', 401));
    }
}
exports.loginRequire = loginRequire;
function adminRole(req, res, next) {
    var _a;
    if (((_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.role) === app_object_1.AppObject.ROLES.ADMIN) {
        return next();
    }
    return next(new app_error_1.AppError('ForbiddenResource', 403));
}
exports.adminRole = adminRole;
function studentRole(req, res, next) {
    var _a;
    if (((_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.role) === app_object_1.AppObject.ROLES.STUDENT) {
        return next();
    }
    return next(new app_error_1.AppError('ForbiddenResource', 403));
}
exports.studentRole = studentRole;
function teacherRole(req, res, next) {
    var _a;
    if (((_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.role) === app_object_1.AppObject.ROLES.TEACHER) {
        return next();
    }
    return next(new app_error_1.AppError('ForbiddenResource', 403));
}
exports.teacherRole = teacherRole;
function groupRole(req, res, next) {
    var _a, _b;
    if (((_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.role) === app_object_1.AppObject.ROLES.TEACHER ||
        ((_b = req === null || req === void 0 ? void 0 : req.payload) === null || _b === void 0 ? void 0 : _b.role) === app_object_1.AppObject.ROLES.STUDENT) {
        return next();
    }
    return next(new app_error_1.AppError('ForbiddenResource', 403));
}
exports.groupRole = groupRole;
