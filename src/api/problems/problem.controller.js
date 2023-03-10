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
var mongoose_1 = __importDefault(require("mongoose"));
var app_object_1 = require("../../commons/app.object");
var problem_service_1 = __importDefault(require("./problem.service"));
function createProblem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.createProblem(req.body)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAllProblem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, page, pageSize, sort, status_1, name_1, conditions, result, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, page = _a.page, pageSize = _a.pageSize, sort = _a.sort, status_1 = _a.status, name_1 = _a.name;
                    conditions = {};
                    if (status_1) {
                        Object.assign(conditions, { status: { $eq: status_1 } });
                    }
                    if (name_1 && name_1 !== 'null') {
                        Object.assign(conditions, { problemName: { $regex: name_1, $options: 'i' } });
                    }
                    return [4 /*yield*/, problem_service_1.default.listByAdmin({
                            conditions: conditions,
                            paginate: { page: page || 1, pageSize: pageSize || -1, sort: sort },
                        })];
                case 1:
                    result = _b.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function changeProblem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.changeProblem(req.params.id)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
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
function deleteTestcase(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.deleteTestcase(req.body.testcaseIds)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
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
function addTestcase(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.addTestcase(req.params.id, req.body.testcases)];
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
function updateTestcase(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.updateTestcase(req.params.id, req.body)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
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
function updateProblem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.updateProblem(req.params.id, req.body)];
                case 1:
                    _a.sent();
                    res.status(200).json({ ok: true });
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    next(error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.getDetail(req.params.id)];
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
function getActiveProblem(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, page, pageSize, sort, inClass, category, level, name_2, code, conditions, result, error_9;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = req.query, page = _b.page, pageSize = _b.pageSize, sort = _b.sort, inClass = _b.inClass, category = _b.category, level = _b.level, name_2 = _b.name, code = _b.code;
                    conditions = {
                        status: { $eq: app_object_1.AppObject.PROBLEM_STATUS.ACTIVE },
                        problemScope: app_object_1.AppObject.APP_SCOPES.PUBLIC,
                    };
                    if (inClass) {
                        Object.assign(conditions, { problemScope: app_object_1.AppObject.APP_SCOPES.CLASS });
                    }
                    if (category) {
                        Object.assign(conditions, {
                            problemCategory: new mongoose_1.default.Types.ObjectId(category),
                        });
                    }
                    if (level) {
                        Object.assign(conditions, {
                            problemLevel: level,
                        });
                    }
                    if (name_2) {
                        Object.assign(conditions, {
                            problemName: { $regex: name_2, $options: 'i' },
                        });
                    }
                    if (code) {
                        Object.assign(conditions, {
                            problemCode: code,
                        });
                    }
                    return [4 /*yield*/, problem_service_1.default.getActiveProblem({
                            conditions: conditions,
                            paginate: { page: page, pageSize: pageSize, sort: sort },
                        }, (_a = req.payload) === null || _a === void 0 ? void 0 : _a.nameOrEmail)];
                case 1:
                    result = _c.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _c.sent();
                    next(error_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getProblemDetail(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.userGetDetail(req.query.code)];
                case 1:
                    result = _a.sent();
                    res.status(200).json(result);
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    next(error_10);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function statistic(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, problem_service_1.default.statistic()];
                case 1:
                    result = _a.sent();
                    res.status(200).json({ result: result });
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    next(error_11);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    createProblem: createProblem,
    getAllProblem: getAllProblem,
    changeProblem: changeProblem,
    deleteTestcase: deleteTestcase,
    updateTestcase: updateTestcase,
    updateProblem: updateProblem,
    addTestcase: addTestcase,
    getDetail: getDetail,
    getActiveProblem: getActiveProblem,
    getProblemDetail: getProblemDetail,
    statistic: statistic
};
