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
var app_error_1 = require("../../libs/errors/app.error");
var user_service_1 = __importDefault(require("../users/user.service"));
var submission_repository_1 = require("./submission.repository");
var jwt_1 = __importDefault(require("../../commons/jwt"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_object_1 = require("../../commons/app.object");
var user_repository_1 = require("../users/user.repository");
var problem_repository_1 = require("../problems/problem.repository");
function createSubmission(submissionInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, existUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!submissionInfo.token) {
                        throw new app_error_1.AppError("InvalidToken", 400);
                    }
                    nameOrEmail = jwt_1.default.verifyToken(submissionInfo.token).nameOrEmail;
                    return [4 /*yield*/, user_service_1.default.findUser({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new app_error_1.AppError("UserNotFound", 400);
                    }
                    delete submissionInfo.token;
                    Object.assign(submissionInfo, { user: existUser._id });
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.create(submissionInfo)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function updateSubmission(submissionId, _a) {
    var memory = _a.memory, executeTime = _a.executeTime, passPercent = _a.passPercent, detail = _a.detail, status = _a.status;
    return __awaiter(this, void 0, void 0, function () {
        var existSubmit, userFound, problemFound, isDone;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.findById(submissionId)];
                case 1:
                    existSubmit = _b.sent();
                    if (!existSubmit) {
                        throw new app_error_1.AppError("SubmissionNotFound", 400);
                    }
                    return [4 /*yield*/, user_repository_1.UserRepository.TSchema.findOne({ _id: existSubmit.user })];
                case 2:
                    userFound = _b.sent();
                    return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findOne({ _id: existSubmit.problem })];
                case 3:
                    problemFound = _b.sent();
                    if (memory)
                        existSubmit.memory = memory;
                    if (executeTime)
                        existSubmit.executeTime = executeTime;
                    if (passPercent)
                        existSubmit.passPercent = passPercent;
                    if (detail)
                        existSubmit.detail = detail;
                    if (status)
                        existSubmit.status = status;
                    if (status !== app_object_1.AppObject.SUBMISSION_STATUS.PENDING) {
                        userFound.practiceTime = userFound.practiceTime + 1;
                    }
                    if (!(status === app_object_1.AppObject.SUBMISSION_STATUS.AC)) return [3 /*break*/, 5];
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.findOne({ problem: existSubmit.problem, user: existSubmit.user, status: app_object_1.AppObject.SUBMISSION_STATUS.AC })];
                case 4:
                    isDone = _b.sent();
                    if (!isDone) {
                        userFound.passProblem = userFound.passProblem + 1;
                        userFound.score = userFound.score + problemFound.score;
                    }
                    _b.label = 5;
                case 5: return [4 /*yield*/, existSubmit.save()];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, userFound.save()];
                case 7:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function listAll(paginate, author) {
    return __awaiter(this, void 0, void 0, function () {
        var params, existUser, result, data, newData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        paginate: paginate,
                        conditions: {
                            contest: { $eq: null }
                        },
                        populate: [{
                                path: 'problem',
                                select: ['problemName', 'problemCode']
                            }, {
                                path: 'user',
                                select: 'displayName'
                            }]
                    };
                    if (!author) return [3 /*break*/, 2];
                    return [4 /*yield*/, user_service_1.default.findUser({ $or: [{ username: author }, { userEmail: author }] })];
                case 1:
                    existUser = _a.sent();
                    Object.assign(params.conditions, { user: existUser._id });
                    _a.label = 2;
                case 2: return [4 /*yield*/, submission_repository_1.SubmissionRepository.getAllWithPaginate(params)];
                case 3:
                    result = _a.sent();
                    data = result.data;
                    newData = data.map(function (item) {
                        item = item.toObject();
                        delete item.userCode;
                        return item;
                    });
                    Object.assign(result, { data: newData });
                    return [2 /*return*/, result];
            }
        });
    });
}
function detail(submissionId, user) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser, existSubmit, returnSubmit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_service_1.default.findUser({ $or: [{ username: user }, { userEmail: user }] })];
                case 1:
                    existUser = _a.sent();
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(submissionId), user: existUser._id })];
                case 2:
                    existSubmit = _a.sent();
                    if (!existSubmit) {
                        throw new app_error_1.AppError("PermissionDenied", 400);
                    }
                    returnSubmit = existSubmit.toObject();
                    if (!returnSubmit.language) {
                        returnSubmit.language = 'cpp';
                    }
                    return [2 /*return*/, returnSubmit];
            }
        });
    });
}
function removeSubmit(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    createSubmission: createSubmission,
    updateSubmission: updateSubmission,
    listAll: listAll,
    detail: detail,
    removeSubmit: removeSubmit,
};
