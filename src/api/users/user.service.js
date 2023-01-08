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
Object.defineProperty(exports, "__esModule", { value: true });
var string_util_1 = require("../../libs/utils/string.util");
var user_repository_1 = require("./user.repository");
var app_error_1 = require("../../libs/errors/app.error");
var app_object_1 = require("../../commons/app.object");
var email_util_1 = require("../../libs/utils/email.util");
var problem_repository_1 = require("../problems/problem.repository");
var contest_repository_1 = require("../contests/contest.repository");
var submission_repository_1 = require("../submissions/submission.repository");
function verifyAccount(params) {
    return __awaiter(this, void 0, void 0, function () {
        var password, account;
        return __generator(this, function (_a) {
            password = (0, string_util_1.hashInformation)(params.password);
            account = params.nameOrEmail;
            return [2 /*return*/, user_repository_1.UserRepository.findOneByCondition({
                    $or: [{ username: account }, { userEmail: account }],
                    password: password,
                })];
        });
    });
}
function getUserInfor(nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.findOne({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new app_error_1.AppError("UserNotExist", 400);
                    }
                    if (existUser.status !== app_object_1.AppObject.ACCOUNT_STATUS.VERIFIED) {
                        throw new app_error_1.AppError("UserIs".concat(existUser.status), 400);
                    }
                    return [2 /*return*/, {
                            username: existUser.username,
                            userEmail: existUser.userEmail,
                            displayName: existUser.displayName,
                            dateOfBirdth: existUser.dateOfBirdth || null,
                            firstName: existUser.firstName || null,
                            lastName: existUser.lastName || null,
                            organization: existUser.organization || null,
                            avatar: existUser.avatar || app_object_1.AppObject.DEFAULT_AVATAR.URL,
                            createdAt: existUser.createdAt,
                            updatedAt: existUser.updatedAt,
                            score: existUser.score,
                            practiceTime: existUser.practiceTime || 0,
                            passProblem: existUser.passProblem || 0
                        }];
            }
        });
    });
}
function checkUserIsExist(params) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({
                        $or: [
                            { username: params.username },
                            { userEmail: params.email },
                            { displayName: params.displayName },
                        ],
                    })];
                case 1:
                    existUser = _a.sent();
                    if (existUser)
                        return [2 /*return*/, true];
                    return [2 /*return*/, false];
            }
        });
    });
}
function registerUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_repository_1.UserRepository.createOne(params)];
        });
    });
}
function findUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_repository_1.UserRepository.findOneByCondition(params)];
        });
    });
}
function activeUser(params) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({
                        $and: [
                            {
                                $or: [
                                    { username: params.nameOrEmail },
                                    { userEmail: params.nameOrEmail },
                                ],
                            },
                            {
                                status: app_object_1.AppObject.ACCOUNT_STATUS.NOT_VERIFIED,
                            },
                        ],
                    })];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new app_error_1.AppError("InvalidUser", 400);
                    }
                    if (!(existUser.activateCode.token === params.token)) return [3 /*break*/, 5];
                    if (!(existUser.activateCode.expires > new Date())) return [3 /*break*/, 3];
                    existUser.status = app_object_1.AppObject.ACCOUNT_STATUS.VERIFIED;
                    return [4 /*yield*/, existUser.save()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3: throw new app_error_1.AppError("TokenExpired", 400);
                case 4: return [3 /*break*/, 6];
                case 5: throw new app_error_1.AppError("InavlidToken", 400);
                case 6: return [2 /*return*/];
            }
        });
    });
}
function resendCode(nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var existUser, activateCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({
                        $and: [
                            {
                                $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }],
                            },
                            {
                                status: app_object_1.AppObject.ACCOUNT_STATUS.NOT_VERIFIED,
                            },
                        ],
                    })];
                case 1:
                    existUser = _a.sent();
                    if (!existUser) {
                        throw new app_error_1.AppError("InvalidUser", 400);
                    }
                    activateCode = (Math.ceil(+new Date() * (Math.random() * 100)) + '').slice(-5);
                    existUser.activateCode = {
                        token: activateCode,
                        expires: new Date().setMinutes(new Date().getMinutes() + 5),
                    };
                    return [4 /*yield*/, existUser.save()];
                case 2:
                    _a.sent();
                    (0, email_util_1.sendEmail)(existUser.userEmail, 'Verify your E-mail adress', {
                        verifyCode: activateCode,
                        email: existUser.userEmail,
                        user: existUser.username,
                    }, 'src/templates/verify-email.template.hbs');
                    return [2 /*return*/];
            }
        });
    });
}
function getTopTen() {
    return __awaiter(this, void 0, void 0, function () {
        var list, newList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.find({ status: app_object_1.AppObject.ACCOUNT_STATUS.VERIFIED }).sort({ "score": -1 }).limit(50)];
                case 1:
                    list = _a.sent();
                    newList = list.map(function (item) {
                        return {
                            name: item.displayName,
                            score: item.score,
                            practiceTime: item.practiceTime,
                            passProblem: item.passProblem
                        };
                    });
                    return [2 /*return*/, newList];
            }
        });
    });
}
function userUpdateProfile(profile, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, _i, _a, key, userExist, userExist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _b.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    _i = 0, _a = Object.keys(profile);
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    key = _a[_i];
                    if (!(key === 'userEmail')) return [3 /*break*/, 4];
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ _id: { $ne: userFound._id }, userEmail: profile.userEmail })];
                case 3:
                    userExist = _b.sent();
                    if (userExist) {
                        throw new app_error_1.AppError('Email already exist', 400);
                    }
                    _b.label = 4;
                case 4:
                    if (!(key === 'displayName')) return [3 /*break*/, 6];
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ _id: { $ne: userFound._id }, displayName: profile.displayName })];
                case 5:
                    userExist = _b.sent();
                    if (userExist) {
                        throw new app_error_1.AppError('Name already exist', 400);
                    }
                    _b.label = 6;
                case 6:
                    if (profile[key])
                        userFound[key] = profile[key];
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [4 /*yield*/, userFound.save()];
                case 9:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function userGetRanking(nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var allUser, userFound, index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.find({ status: app_object_1.AppObject.ACCOUNT_STATUS.VERIFIED }).sort({ score: -1 })];
                case 1:
                    allUser = _a.sent();
                    return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 2:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    index = allUser.findIndex(function (item) {
                        return item._id.toString() === userFound._id.toString();
                    });
                    return [2 /*return*/, index + 1];
            }
        });
    });
}
function getAdminInfo(userOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var adminExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.findOne({ username: userOrEmail, userRole: 'admin', status: { $ne: 'deleted' } }, { username: 1, displayName: 1, userEmail: 1, avatar: 1 })];
                case 1:
                    adminExist = _a.sent();
                    return [2 /*return*/, adminExist];
            }
        });
    });
}
function adminStatistic() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userStats, problemStats, SubmitStats, contestStats;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        user_repository_1.UserRepository.TSchema.aggregate([{ $group: { _id: '$userRole', count: { $sum: 1 } } }]),
                        problem_repository_1.ProblemRepository.TSchema.aggregate([{ $group: { _id: '$problemLevel', count: { $sum: 1 } } }]),
                        submission_repository_1.SubmissionRepository.TSchema.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
                        contest_repository_1.ContestRepository.TSchema.count({})
                    ])];
                case 1:
                    _a = _b.sent(), userStats = _a[0], problemStats = _a[1], SubmitStats = _a[2], contestStats = _a[3];
                    return [2 /*return*/, {
                            user: userStats,
                            problem: problemStats,
                            submission: SubmitStats,
                            contest: contestStats
                        }];
            }
        });
    });
}
function autoInsert() {
    return __awaiter(this, void 0, void 0, function () {
        var listProblem, userList, i, passProblem, score, j, correct;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, problem_repository_1.ProblemRepository.TSchema.find({})];
                case 1:
                    listProblem = _a.sent();
                    return [4 /*yield*/, user_repository_1.UserRepository.TSchema.find({ status: 'verified' })];
                case 2:
                    userList = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < userList.length)) return [3 /*break*/, 10];
                    passProblem = 0;
                    score = 0;
                    j = 0;
                    _a.label = 4;
                case 4:
                    if (!(j < listProblem.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, submission_repository_1.SubmissionRepository.TSchema.count({ user: userList[i]._id, problem: listProblem[j]._id, status: 'Accepted' })];
                case 5:
                    correct = _a.sent();
                    if (correct > 0) {
                        passProblem += 1;
                        score += +listProblem[j].score || 1;
                    }
                    _a.label = 6;
                case 6:
                    j++;
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, user_repository_1.UserRepository.TSchema.updateOne({ _id: userList[i]._id }, { $set: { passProblem: passProblem, score: score } })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 3];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.default = {
    verifyAccount: verifyAccount,
    checkUserIsExist: checkUserIsExist,
    registerUser: registerUser,
    findUser: findUser,
    activeUser: activeUser,
    resendCode: resendCode,
    getUserInfor: getUserInfor,
    getTopTen: getTopTen,
    userUpdateProfile: userUpdateProfile,
    userGetRanking: userGetRanking,
    getAdminInfo: getAdminInfo,
    adminStatistic: adminStatistic,
    autoInsert: autoInsert,
};
