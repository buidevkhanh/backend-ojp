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
var category_repository_1 = require("../categories/category.repository");
var problem_repository_1 = require("./problem.repository");
var crypto_1 = require("crypto");
var testcase_repository_1 = require("./testcases/testcase.repository");
var testcase_collection_1 = __importDefault(require("./testcases/testcase.collection"));
var app_object_1 = require("../../commons/app.object");
var user_service_1 = __importDefault(require("../users/user.service"));
var submission_repository_1 = require("../submissions/submission.repository");
var user_repository_1 = require("../users/user.repository");
function createProblem(problemInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var existCategory, createTestcase, problemCases, params, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    problemInfo.score = 1;
                    if (problemInfo.status === app_object_1.AppObject.PROBLEM_LEVEL.MEDIUM) {
                        Object.assign(problemInfo, { score: 3 });
                    }
                    return [4 /*yield*/, category_repository_1.CategoryRepository.TSchema.findById(problemInfo === null || problemInfo === void 0 ? void 0 : problemInfo.problemCategory)];
                case 1:
                    existCategory = _a.sent();
                    if (!existCategory) {
                        throw new app_error_1.AppError('CategoryNotFound', 400);
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, Promise.all(problemInfo.problemCases.map(function (item) {
                            return testcase_repository_1.TestcaseRepository.createWithReturn(item);
                        }))];
                case 3:
                    createTestcase = _a.sent();
                    problemCases = createTestcase.map(function (item) {
                        return item._id.toString();
                    });
                    params = problemInfo;
                    Object.assign(params, { problemCode: (0, crypto_1.randomUUID)() });
                    Object.assign(params, { problemCases: problemCases });
                    Object.assign(params, { status: app_object_1.AppObject.PROBLEM_STATUS.ACTIVE });
                    return [2 /*return*/, problem_repository_1.ProblemRepository.createOne(problemInfo)];
                case 4:
                    error_1 = _a.sent();
                    throw new app_error_1.AppError(error_1, 400);
                case 5: return [2 /*return*/];
            }
        });
    });
}
function listByAdmin(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, problem_repository_1.ProblemRepository.getAllWithPaginate(params)];
        });
    });
}
function changeProblem(problemId) {
    return __awaiter(this, void 0, void 0, function () {
        var existProblem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findById(problemId)];
                case 1:
                    existProblem = _a.sent();
                    if (!existProblem) {
                        throw new app_error_1.AppError("ProblemNotFound", 400);
                    }
                    if (existProblem.status !== app_object_1.AppObject.PROBLEM_STATUS.ACTIVE &&
                        existProblem.status !== app_object_1.AppObject.PROBLEM_STATUS.INACTIVE) {
                        throw new app_error_1.AppError("NotAcceptedProblem", 400);
                    }
                    if (existProblem.status === app_object_1.AppObject.PROBLEM_STATUS.ACTIVE) {
                        existProblem.status = app_object_1.AppObject.PROBLEM_STATUS.INACTIVE;
                    }
                    else {
                        existProblem.status = app_object_1.AppObject.PROBLEM_STATUS.ACTIVE;
                    }
                    return [4 /*yield*/, existProblem.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteTestcase(testcaseIds) {
    return __awaiter(this, void 0, void 0, function () {
        var session, existProblems, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, testcase_collection_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 9, 10, 11]);
                    return [4 /*yield*/, testcase_repository_1.TestcaseRepository.TSchema.deleteMany({
                            _id: { $in: testcaseIds },
                        })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.find({
                            problemCases: { $in: testcaseIds },
                        })];
                case 4:
                    existProblems = _b.sent();
                    i = 0;
                    _b.label = 5;
                case 5:
                    if (!(i < existProblems.length)) return [3 /*break*/, 8];
                    existProblems[i].problemCases = existProblems[i].problemCases.filter(function (item) {
                        return !testcaseIds.includes(item._id.toString());
                    });
                    return [4 /*yield*/, existProblems[i].save()];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 5];
                case 8:
                    session.commitTransaction();
                    return [3 /*break*/, 11];
                case 9:
                    _a = _b.sent();
                    session.abortTransaction();
                    return [3 /*break*/, 11];
                case 10:
                    session.endSession();
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function updateTestcase(testcaseId, testcaseInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var existTestcase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testcase_repository_1.TestcaseRepository.TSchema.findById(testcaseId)];
                case 1:
                    existTestcase = _a.sent();
                    if (!existTestcase) {
                        throw new app_error_1.AppError("TestcaseNotFound", 400);
                    }
                    if (testcaseInfo.input)
                        existTestcase.input = testcaseInfo.input;
                    if (testcaseInfo.output)
                        existTestcase.output = testcaseInfo.output;
                    return [4 /*yield*/, existTestcase.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateProblem(problemId, problemInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var newScore, existProblem, oldScore, insc_1, userDone, key;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newScore = -1;
                    if (problemInfo.problemLevel) {
                        if (problemInfo.problemLevel === app_object_1.AppObject.PROBLEM_LEVEL.MEDIUM) {
                            Object.assign(problemInfo, { score: 3 });
                            newScore = 3;
                        }
                        else {
                            Object.assign(problemInfo, { score: 1 });
                            newScore = 1;
                        }
                    }
                    return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findById(problemId)];
                case 1:
                    existProblem = _a.sent();
                    if (!existProblem) {
                        throw new app_error_1.AppError("ProblemNotFound", 400);
                    }
                    oldScore = existProblem.score;
                    if (!(newScore !== -1)) return [3 /*break*/, 3];
                    insc_1 = newScore - oldScore;
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.find({ contest: null, status: app_object_1.AppObject.SUBMISSION_STATUS.AC, problem: existProblem._id }, { user: 1, score: 1 })];
                case 2:
                    userDone = _a.sent();
                    userDone.forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var userFound;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.findOne({ _id: user.user })];
                                case 1:
                                    userFound = _a.sent();
                                    userFound.score = userFound.score + insc_1;
                                    userFound.save();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _a.label = 3;
                case 3:
                    for (key in problemInfo) {
                        existProblem[key] = problemInfo[key];
                    }
                    return [4 /*yield*/, existProblem.save()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getDetail(problemId) {
    return __awaiter(this, void 0, void 0, function () {
        var existProblem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findById(problemId).populate({
                        path: 'problemCases',
                    })];
                case 1:
                    existProblem = _a.sent();
                    if (!existProblem) {
                        throw new app_error_1.AppError("ProblemNotFound", 400);
                    }
                    return [2 /*return*/, existProblem];
            }
        });
    });
}
function addTestcase(problemId, testcaseInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var existProblem, testcaseIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findById(problemId)];
                case 1:
                    existProblem = _a.sent();
                    if (!existProblem) {
                        throw new app_error_1.AppError("ProblemNotFound", 400);
                    }
                    return [4 /*yield*/, Promise.all(testcaseInfo.map(function (item) {
                            return testcase_repository_1.TestcaseRepository.TSchema.create({
                                input: item.input,
                                output: item.output,
                            });
                        }))];
                case 2:
                    testcaseIds = _a.sent();
                    testcaseIds.forEach(function (item) {
                        existProblem.problemCases.push(item._id.toString());
                    });
                    return [4 /*yield*/, existProblem.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getActiveProblem(params, user) {
    return __awaiter(this, void 0, void 0, function () {
        var problems, newList, existUser, userId, i, item, isDone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Object.assign(params, {
                        populate: {
                            path: 'problemCategory',
                            model: app_object_1.AppObject.MONGO.COLLECTION.CATEGORIES,
                        },
                        projections: {
                            "problemName": 1,
                            "problemCode": 1,
                            "problemLevel": 1
                        }
                    });
                    return [4 /*yield*/, problem_repository_1.ProblemRepository.getAllWithPaginate(params)];
                case 1:
                    problems = _a.sent();
                    if (!user) return [3 /*break*/, 7];
                    newList = [];
                    return [4 /*yield*/, user_service_1.default.findUser({ $or: [{ username: user }, { userEmail: user }] })];
                case 2:
                    existUser = _a.sent();
                    userId = existUser._id;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < problems.data.length)) return [3 /*break*/, 6];
                    item = problems.data[i];
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.findOneByCondition({ problem: item._id, user: userId, status: app_object_1.AppObject.SUBMISSION_STATUS.AC })];
                case 4:
                    isDone = _a.sent();
                    if (isDone) {
                        newList.push(Object.assign(problems.data[i].toObject(), { isDone: true }));
                    }
                    else {
                        newList.push(Object.assign(problems.data[i].toObject(), { isDone: false }));
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    ;
                    problems.data = newList;
                    _a.label = 7;
                case 7: return [2 /*return*/, problems];
            }
        });
    });
}
function userGetDetail(code) {
    return __awaiter(this, void 0, void 0, function () {
        var result, example;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.findOne({
                        status: app_object_1.AppObject.PROBLEM_STATUS.ACTIVE,
                        problemCode: code,
                    }).populate([{ path: 'problemCategory' }, { path: 'problemCases' }])];
                case 1:
                    result = _a.sent();
                    if (!result) {
                        throw new app_error_1.AppError("problemNotFound", 400);
                    }
                    example = result.problemCases[0];
                    return [2 /*return*/, Object.assign(result.toObject(), { example: example, problemCases: 'Not public' })];
            }
        });
    });
}
function statistic() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, users, problems, submissions;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        user_repository_1.UserRepository.TSchema.count({ status: app_object_1.AppObject.ACCOUNT_STATUS.VERIFIED }),
                        problem_repository_1.ProblemRepository.TSchema.count({ status: app_object_1.AppObject.COMMON_STATUS.ACTIVE }),
                        submission_repository_1.SubmissionRepository.TSchema.count({})
                    ])];
                case 1:
                    _a = _b.sent(), users = _a[0], problems = _a[1], submissions = _a[2];
                    return [2 /*return*/, {
                            totalUser: users,
                            totalProblem: problems,
                            totalSubmission: submissions
                        }];
            }
        });
    });
}
exports.default = {
    createProblem: createProblem,
    listByAdmin: listByAdmin,
    changeProblem: changeProblem,
    deleteTestcase: deleteTestcase,
    updateTestcase: updateTestcase,
    updateProblem: updateProblem,
    getDetail: getDetail,
    addTestcase: addTestcase,
    getActiveProblem: getActiveProblem,
    userGetDetail: userGetDetail,
    statistic: statistic
};
