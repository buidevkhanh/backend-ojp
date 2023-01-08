"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.getReaction = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var app_error_1 = require("../../libs/errors/app.error");
var problem_repository_1 = require("../problems/problem.repository");
var reaction_repository_1 = require("./reactions/reaction.repository");
var user_repository_1 = require("../users/user.repository");
var comment_repository_1 = require("./comment.repository");
var reply_repository_1 = require("./replies/reply.repository");
function createComment(nameOrEmail, problemId, content) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userFound, problemFound;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!content.trim()) {
                        throw new app_error_1.AppError('Content invalid', 400);
                    }
                    return [4 /*yield*/, Promise.all([
                            user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] }),
                            problem_repository_1.ProblemRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(problemId) })
                        ])];
                case 1:
                    _a = _b.sent(), userFound = _a[0], problemFound = _a[1];
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    if (!problemFound) {
                        throw new app_error_1.AppError('Problem not found', 400);
                    }
                    return [4 /*yield*/, comment_repository_1.CommentRepository.createOne({ user: userFound._id.toString(), problem: problemFound._id.toString(), content: content })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateComment(nameOrEmail, commentId, content) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, commentFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, comment_repository_1.CommentRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(commentId), user: userFound._id })];
                case 2:
                    commentFound = _a.sent();
                    if (!commentFound) {
                        throw new app_error_1.AppError('Comment not found', 400);
                    }
                    commentFound.content = content;
                    return [4 /*yield*/, commentFound.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeComment(commentId, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, commentFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, comment_repository_1.CommentRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(commentId), user: userFound._id })];
                case 2:
                    commentFound = _a.sent();
                    if (!commentFound) {
                        throw new app_error_1.AppError('Comment not found', 400);
                    }
                    return [4 /*yield*/, comment_repository_1.CommentRepository.TSchema.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(commentId), user: userFound._id })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getComment(problemId, page) {
    return __awaiter(this, void 0, void 0, function () {
        var comments, newComments, i, item, _a, agreement, replies, newReplies, i_1, rp, agreement_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, comment_repository_1.CommentRepository.TSchema.find({ problem: new mongoose_1.default.Types.ObjectId(problemId) })
                        .populate([{ path: 'user', select: 'displayName avatar' }])
                        .sort({ createdAt: -1 })];
                case 1:
                    comments = _b.sent();
                    newComments = [];
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < comments.length)) return [3 /*break*/, 9];
                    item = comments[i];
                    return [4 /*yield*/, Promise.all([
                            reaction_repository_1.ReactionRepository.TSchema.count({ target: item._id, reactionType: "agreement" }),
                            reply_repository_1.ReplyRepository.TSchema.find({ comment: item._id }, { user: 1, content: 1, createdAt: 1, updatedAt: 1 })
                                .sort({ createdAt: -1 })
                                .populate({ path: 'user', select: 'displayName avatar' })
                        ])
                        //const agreement = await ReactionRepository.TSchema.count({target: item._id, reactionType: "agreement"});
                        //const replies = await ReplyRepository.TSchema.find({comment: item._id},{user: 1, content: 1, createdAt: 1, updatedAt: 1}).sort({createdAt: -1}).populate({path: 'user', select: 'displayName avatar'});
                    ];
                case 3:
                    _a = _b.sent(), agreement = _a[0], replies = _a[1];
                    newReplies = [];
                    i_1 = 0;
                    _b.label = 4;
                case 4:
                    if (!(i_1 < replies.length)) return [3 /*break*/, 7];
                    rp = replies[i_1];
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.TSchema.count({ target: rp._id, reactionType: "agreement" })];
                case 5:
                    agreement_1 = _b.sent();
                    newReplies.push(__assign(__assign({}, rp.toObject()), { agreement: agreement_1 }));
                    _b.label = 6;
                case 6:
                    i_1++;
                    return [3 /*break*/, 4];
                case 7:
                    newComments.push(__assign(__assign({}, item.toObject()), { agreement: agreement, replies: newReplies }));
                    _b.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 2];
                case 9:
                    ;
                    return [2 /*return*/, newComments];
            }
        });
    });
}
function replyComment(commentId, content, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, commentFound, userFound;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        comment_repository_1.CommentRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(commentId) }),
                        user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })
                    ])];
                case 1:
                    _a = _b.sent(), commentFound = _a[0], userFound = _a[1];
                    if (!commentFound) {
                        throw new app_error_1.AppError('Comment not found', 400);
                    }
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, reply_repository_1.ReplyRepository.createOne({ user: userFound._id.toString(), comment: commentId, content: content })];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateReply(replyId, nameOrEmail, content) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, replyFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, reply_repository_1.ReplyRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(replyId), user: userFound._id })];
                case 2:
                    replyFound = _a.sent();
                    if (!replyFound) {
                        throw new app_error_1.AppError('Reply not found', 400);
                    }
                    replyFound.content = content;
                    return [4 /*yield*/, replyFound.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function removeReply(replyId, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, replyFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, reply_repository_1.ReplyRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(replyId), user: userFound._id })];
                case 2:
                    replyFound = _a.sent();
                    if (!replyFound) {
                        throw new app_error_1.AppError('Reply not found', 400);
                    }
                    return [4 /*yield*/, reply_repository_1.ReplyRepository.TSchema.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(replyId), user: userFound._id })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createReaction(reactionType, targetId, nameOrEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, _a, commentFound, replyFound, reactionFound;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _b.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, Promise.all([
                            comment_repository_1.CommentRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(targetId) }),
                            reply_repository_1.ReplyRepository.findOneByCondition({ _id: new mongoose_1.default.Types.ObjectId(targetId) }),
                            reaction_repository_1.ReactionRepository.findOneByCondition({ target: new mongoose_1.default.Types.ObjectId(targetId), user: userFound })
                        ])];
                case 2:
                    _a = _b.sent(), commentFound = _a[0], replyFound = _a[1], reactionFound = _a[2];
                    if (!commentFound && !replyFound) {
                        throw new app_error_1.AppError("Target not found", 400);
                    }
                    if (!reactionFound) return [3 /*break*/, 4];
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.TSchema.deleteOne({ _id: reactionFound._id })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, reaction_repository_1.ReactionRepository.createOne({ user: userFound._id.toString(), target: targetId, reactionType: reactionType })];
                case 5:
                    _b.sent();
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getOwnReaction(nameOrEmail, targetId) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, reactionFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.findOneByCondition({ target: new mongoose_1.default.Types.ObjectId(targetId), user: userFound })];
                case 2:
                    reactionFound = _a.sent();
                    return [2 /*return*/, reactionFound];
            }
        });
    });
}
function changeReaction(nameOrEmail, targetId, reactionType) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, reactionFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    if (!userFound) {
                        throw new app_error_1.AppError('User not found', 400);
                    }
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.findOneByCondition({ target: new mongoose_1.default.Types.ObjectId(targetId), user: userFound })];
                case 2:
                    reactionFound = _a.sent();
                    if (!(reactionFound.reactionType === reactionType)) return [3 /*break*/, 4];
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.TSchema.deleteOne({ target: new mongoose_1.default.Types.ObjectId(targetId), user: userFound })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    reactionFound.reactionType = reactionType;
                    return [4 /*yield*/, reactionFound.save()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getReaction(nameOrEmail, problemId) {
    return __awaiter(this, void 0, void 0, function () {
        var userFound, comments, listTargetId, i, item, replies, i_2, hasReaction, newHasReaction;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_repository_1.UserRepository.findOneByCondition({ $or: [{ username: nameOrEmail }, { userEmail: nameOrEmail }] })];
                case 1:
                    userFound = _a.sent();
                    return [4 /*yield*/, comment_repository_1.CommentRepository.TSchema.find({ problem: new mongoose_1.default.Types.ObjectId(problemId) }).populate([{ path: 'user', select: 'displayName avatar' }]).sort({ createdAt: -1 })];
                case 2:
                    comments = _a.sent();
                    listTargetId = [];
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < comments.length)) return [3 /*break*/, 6];
                    item = comments[i];
                    listTargetId.push(comments[i]._id);
                    return [4 /*yield*/, reply_repository_1.ReplyRepository.TSchema.find({ comment: item._id }, { user: 1, content: 1, createdAt: 1, updatedAt: 1 }).sort({ createdAt: -1 }).populate({ path: 'user', select: 'displayName avatar' })];
                case 4:
                    replies = _a.sent();
                    for (i_2 = 0; i_2 < replies.length; i_2++) {
                        listTargetId.push(replies[i_2]._id);
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 3];
                case 6:
                    ;
                    return [4 /*yield*/, reaction_repository_1.ReactionRepository.TSchema.find({ target: { $in: listTargetId }, user: userFound._id })];
                case 7:
                    hasReaction = _a.sent();
                    newHasReaction = hasReaction.map(function (item) {
                        return {
                            target: item.target,
                            type: item.reactionType
                        };
                    });
                    return [2 /*return*/, newHasReaction];
            }
        });
    });
}
exports.getReaction = getReaction;
exports.default = {
    createComment: createComment,
    updateComment: updateComment,
    removeComment: removeComment,
    getComment: getComment,
    replyComment: replyComment,
    removeReply: removeReply,
    updateReply: updateReply,
    createReaction: createReaction,
    getOwnReaction: getOwnReaction,
    changeReaction: changeReaction,
    getReaction: getReaction
};
