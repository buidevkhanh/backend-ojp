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
var user_service_1 = __importDefault(require("./user.service"));
var user_service_2 = __importDefault(require("./user.service"));
function activeUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, nameOrEmail, token, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, nameOrEmail = _a.nameOrEmail, token = _a.token;
                    return [4 /*yield*/, user_service_2.default.activeUser({
                            token: token,
                            nameOrEmail: nameOrEmail,
                        })];
                case 1:
                    _b.sent();
                    res.status(200).json({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function resendCode(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    nameOrEmail = req.body.nameOrEmail;
                    return [4 /*yield*/, user_service_2.default.resendCode(nameOrEmail)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getUserInfor(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    payload = req.payload;
                    return [4 /*yield*/, user_service_2.default.getUserInfor(payload.nameOrEmail)];
                case 1:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getTopTen(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_2.default.getTopTen()];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function userUpdateInfo(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_2.default.userUpdateProfile(req.body, req.payload.nameOrEmail)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function userGetRanking(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_1.default.userGetRanking(req.payload.nameOrEmail)];
                case 1:
                    result = _a.sent();
                    res.status(200).json({ data: result });
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    next(error_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAdminInfo(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_1.default.getAdminInfo((_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.userOrEmail)];
                case 1:
                    result = _b.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _b.sent();
                    next(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function adminStatistic(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_1.default.adminStatistic()];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    next(error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function autoInsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user_service_2.default.autoInsert()];
                case 1:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    next(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    activeUser: activeUser,
    resendCode: resendCode,
    getUserInfor: getUserInfor,
    getTopTen: getTopTen,
    userUpdateInfo: userUpdateInfo,
    userGetRanking: userGetRanking,
    getAdminInfo: getAdminInfo,
    adminStatistic: adminStatistic,
    autoInsert: autoInsert
};
