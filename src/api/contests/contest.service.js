"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var mongoose_1 = __importStar(require("mongoose"));
var app_object_1 = require("../../commons/app.object");
var jwt_1 = __importDefault(require("../../commons/jwt"));
var app_error_1 = require("../../libs/errors/app.error");
var problem_repository_1 = require("../problems/problem.repository");
var user_repository_1 = require("../users/user.repository");
var contest_history_repository_1 = require("./contest-histories/contest-history.repository");
var contest_repository_1 = require("./contest.repository");
var signale = __importStar(require("signale"));
var format_duration_1 = __importDefault(require("format-duration"));
function createContest(contest) {
    return __awaiter(this, void 0, void 0, function () {
        var name, existContest, created, closeAt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = contest.name;
                    return [4 /*yield*/, contest_repository_1.ContestRepository.findOneByCondition({ name: { $regex: name, $options: 'i' } })];
                case 1:
                    existContest = _a.sent();
                    if (existContest) {
                        throw new app_error_1.AppError('Contest name already exist', 400);
                    }
                    return [4 /*yield*/, contest_repository_1.ContestRepository.createWithReturn(contest)];
                case 2:
                    created = _a.sent();
                    closeAt = structuredClone(created.beginAt);
                    closeAt.setHours(closeAt.getHours() + created.duration);
                    created.closeAt = closeAt;
                    return [4 /*yield*/, created.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function adminList(_a) {
    var page = _a.page, pageSize = _a.pageSize;
    return __awaiter(this, void 0, void 0, function () {
        var params;
        return __generator(this, function (_b) {
            params = {
                paginate: {
                    page: page || 1,
                    pageSize: pageSize || 20,
                    sort: 'beginAt:-1'
                },
                populate: [
                    { path: 'questions.problem', select: '_id problemName' }
                ]
            };
            return [2 /*return*/, contest_repository_1.ContestRepository.getAllWithPaginate(params)];
        });
    });
}
function userList(_a) {
    var page = _a.page, pageSize = _a.pageSize;
    return __awaiter(this, void 0, void 0, function () {
        var params, list;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    params = {
                        paginate: {
                            page: page || 1,
                            pageSize: pageSize || 20,
                            sort: 'beginAt:-1'
                        },
                        conditions: {
                            beginAt: { $gt: new Date() }
                        }
                    };
                    return [4 /*yield*/, contest_repository_1.ContestRepository.getAllWithPaginate(params)];
                case 1:
                    list = _b.sent();
                    list.data = list.data.map(function (item) {
                        item = item.toObject();
                        var users = item.user.length;
                        delete item.user;
                        if (typeof item.limitedMember === 'number') {
                            Object.assign(item, { remainMember: item.limitedMember - users });
                        }
                        else {
                            Object.assign(item, { remainMember: 'No limit' });
                        }
                        Object.assign(item, { users: users });
                        return item;
                    });
                    return [2 /*return*/, list];
            }
        });
    });
}
function userListOwn(userId, time) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, params, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: userId }, { userEmail: userId }] })];
                case 1:
                    userFound = _a.sent();
                    params = {
                        paginate: {
                            page: 1,
                            pageSize: -1,
                            sort: 'beginAt:-1'
                        },
                        conditions: {}
                    };
                    if (time === 'previous') {
                        Object.assign(params.conditions, { closeAt: { $lt: new Date() } });
                    }
                    else if (time === 'current') {
                        Object.assign(params.conditions, { closeAt: { $gt: new Date() } });
                    }
                    Object.assign(params.conditions, { user: userFound._id.toString() });
                    return [4 /*yield*/, contest_repository_1.ContestRepository.getAllWithPaginate(params)];
                case 2:
                    list = _a.sent();
                    list.data = list.data.map(function (item) {
                        item = item.toObject();
                        var users = item.user.length;
                        delete item.user;
                        if (typeof item.limitedMember === 'number') {
                            Object.assign(item, { remainMember: item.limitedMember - users });
                        }
                        else {
                            Object.assign(item, { remainMember: 'No limit' });
                        }
                        Object.assign(item, { users: users });
                        return item;
                    });
                    return [2 /*return*/, list];
            }
        });
    });
}
function userRegister(contestId, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var contestFound, userFound, member, isExist, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contest_repository_1.ContestRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(contestId) })];
                case 1:
                    contestFound = _a.sent();
                    if (!contestFound) {
                        throw new app_error_1.AppError('Contest not found', 400);
                    }
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 2:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    member = contestFound.user;
                    if (typeof contestFound.limitedMember == 'number' && member.length === contestFound.limitedMember) {
                        throw new app_error_1.AppError('Contest is full', 400);
                    }
                    isExist = false;
                    for (i = 0; i < member.length; i++) {
                        if (member[i].toString() === userFound._id.toString()) {
                            isExist = true;
                            break;
                        }
                    }
                    if (isExist) {
                        throw new app_error_1.AppError('User already register', 400);
                    }
                    member.push(userFound._id.toString());
                    return [4 /*yield*/, contestFound.save()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, addHistory(userFound._id.toString(), contestFound._id.toString())];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addHistory(userId, contestId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.createOne({ user: userId, contest: contestId, history: [] })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userJoinContest(userToken, contestId) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, userFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameOrEmail = jwt_1.default.verifyToken(userToken).nameOrEmail;
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.TSchema.updateOne({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId), status: { $eq: app_object_1.AppObject.CONTEST_STATUS.NOT_JOIN } }, { $set: { status: app_object_1.AppObject.CONTEST_STATUS.PROCESSING } })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userSubmit(userToken, contestId, submission) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, userFound, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    nameOrEmail = jwt_1.default.verifyToken(userToken).nameOrEmail;
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.findOneByCondition({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId) })];
                case 2:
                    history = _a.sent();
                    history.history.unshift(submission);
                    return [4 /*yield*/, history.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userGetContestHistory(nameOrEmail, contestId) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.TSchema.findOne({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId) }).populate({
                            path: 'history'
                        })];
                case 2:
                    history = _a.sent();
                    return [2 /*return*/, history];
            }
        });
    });
}
function checkUserContest(userToken, contestId) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, userFound, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userToken)
                        return [2 /*return*/, false];
                    nameOrEmail = jwt_1.default.verifyToken(userToken).nameOrEmail;
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.findOneByCondition({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId) })];
                case 2:
                    history = _a.sent();
                    if (!history || !(history.status === app_object_1.AppObject.CONTEST_STATUS.PROCESSING)) {
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
function autoEndContest() {
    return __awaiter(this, void 0, void 0, function () {
        var historyList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.TSchema.aggregate([
                        {
                            $lookup: {
                                from: 'contests',
                                localField: 'contest',
                                foreignField: '_id',
                                as: 'contest'
                            },
                        }, {
                            $unwind: {
                                path: '$contest',
                                preserveNullAndEmptyArrays: true
                            }
                        }, {
                            $match: {
                                'status': { $ne: app_object_1.AppObject.CONTEST_STATUS.DONE },
                                'contest.closeAt': { $lt: new Date() }
                            }
                        }
                    ])];
                case 1:
                    historyList = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < historyList.length)) return [3 /*break*/, 5];
                    historyList[i].status = app_object_1.AppObject.CONTEST_STATUS.DONE;
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.TSchema.updateOne({ _id: historyList[i] }, { $set: { status: app_object_1.AppObject.CONTEST_STATUS.DONE } })];
                case 3:
                    _a.sent();
                    signale.complete("[Cron] contest history ".concat(historyList[i]._id, " was done"));
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function userFinishContest(userToken, contestId) {
    return __awaiter(this, void 0, void 0, function () {
        var nameOrEmail, userFound, history;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!userToken)
                        return [2 /*return*/, false];
                    nameOrEmail = jwt_1.default.verifyToken(userToken).nameOrEmail;
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.findOneByCondition({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId), status: { $nin: [app_object_1.AppObject.CONTEST_STATUS.NOT_JOIN, app_object_1.AppObject.CONTEST_STATUS.DONE] } })];
                case 2:
                    history = _a.sent();
                    if (!history) {
                        return [2 /*return*/];
                    }
                    history.status = app_object_1.AppObject.CONTEST_STATUS.DONE;
                    return [4 /*yield*/, history.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userGetDetail(contestId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, contestFound, newContest, newQuestion, i, problem, newProblem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: userId }, { userEmail: userId }] })];
                case 1:
                    userFound = _a.sent();
                    return [4 /*yield*/, contest_repository_1.ContestRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(contestId), user: userFound._id })];
                case 2:
                    contestFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    if (!contestFound) {
                        throw new app_error_1.AppError('Contest not found', 400);
                    }
                    newContest = contestFound.toObject();
                    delete newContest.user;
                    newQuestion = [];
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < newContest.questions.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findOne({ _id: new mongoose_1.default.Types.ObjectId(newContest.questions[i].problem) }, { _id: 1, problemName: 1, problemQuestion: 1, expectedInput: 1, expectedOutput: 1, problemCases: 1 }).populate({ path: 'problemCases', select: ['input', 'output'] })];
                case 4:
                    problem = _a.sent();
                    newProblem = problem.toObject();
                    Object.assign(newProblem, { example: newProblem.problemCases[0] });
                    delete newProblem.problemCases;
                    newQuestion.push({
                        problem: newProblem,
                        score: newContest.questions[i].score
                    });
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    Object.assign(newContest, { questions: newQuestion });
                    return [2 /*return*/, newContest];
            }
        });
    });
}
function userGetScore(contestId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, contestFound, score, history, _loop_1, i, timeSpend;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: userId }, { userEmail: userId }] })];
                case 1:
                    userFound = _a.sent();
                    return [4 /*yield*/, contest_repository_1.ContestRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(contestId), user: userFound._id })];
                case 2:
                    contestFound = _a.sent();
                    score = 0;
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    if (!contestFound) {
                        throw new app_error_1.AppError('Contest not found', 400);
                    }
                    return [4 /*yield*/, contest_history_repository_1.ContestHistoryRepository.TSchema.findOne({ user: userFound._id, contest: new mongoose_1.Types.ObjectId(contestId), status: app_object_1.AppObject.CONTEST_STATUS.DONE }).populate({ path: 'history', select: ['problem', 'status'] })];
                case 3:
                    history = _a.sent();
                    if (!history) {
                        throw new app_error_1.AppError('History not found', 400);
                    }
                    _loop_1 = function (i) {
                        var isCorrect = history.history.findIndex(function (item) {
                            return (item.problem.toString() === contestFound.questions[i].problem.toString() && item.status === app_object_1.AppObject.SUBMISSION_STATUS.AC);
                        });
                        if (isCorrect !== -1)
                            score += Number(contestFound.questions[i].score);
                    };
                    for (i = 0; i < contestFound.questions.length; i++) {
                        _loop_1(i);
                    }
                    timeSpend = history.updatedAt - contestFound.beginAt;
                    return [2 /*return*/, {
                            score: score,
                            time: (0, format_duration_1.default)(timeSpend)
                        }];
            }
        });
    });
}
exports.default = {
    createContest: createContest,
    adminList: adminList,
    userList: userList,
    userRegister: userRegister,
    userListOwn: userListOwn,
    addHistory: addHistory,
    userGetDetail: userGetDetail,
    userJoinContest: userJoinContest,
    userSubmit: userSubmit,
    checkUserContest: checkUserContest,
    userGetContestHistory: userGetContestHistory,
    userFinishContest: userFinishContest,
    autoEndContest: autoEndContest,
    userGetScore: userGetScore
};
