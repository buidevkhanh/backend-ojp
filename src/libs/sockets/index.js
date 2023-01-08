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
var socket_io_1 = require("socket.io");
require('promise');
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
var signale_1 = __importDefault(require("signale"));
var app_object_1 = require("../../commons/app.object");
var executes_1 = require("../executes");
var path_1 = __importDefault(require("path"));
var problem_service_1 = __importDefault(require("../../api/problems/problem.service"));
var code_util_1 = require("../utils/code.util");
var submission_service_1 = __importDefault(require("../../api/submissions/submission.service"));
var submission_collection_1 = __importDefault(require("../../api/submissions/submission.collection"));
var contest_service_1 = __importDefault(require("../../api/contests/contest.service"));
var contest_history_collection_1 = __importDefault(require("../../api/contests/contest-histories/contest-history.collection"));
function initialSocket(app) {
    var _this = this;
    var server = http_1.default.createServer(app);
    var socket = new socket_io_1.Server(server, { cors: { origin: "*" } });
    // Socket action
    socket.on('connection', function (client) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            submission_collection_1.default.watch().on('change', function () {
                client.emit(app_object_1.AppObject.SOCKET.RESPONSE.HOOK_SUBMISSION, { change: 1 });
            });
            contest_history_collection_1.default.watch().on('change', function () {
                client.emit('has_update', { change: 1 });
            });
            client.on(app_object_1.AppObject.SOCKET.ACTIONS.ACTION_SUBMIT_PROBLEM, function (data) { return __awaiter(_this, void 0, void 0, function () {
                var uuid, tempFilename, passPercent, totalPass, submitResult, submisson, tempFolder;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            uuid = require('uuid').v1();
                            tempFilename = uuid;
                            passPercent = 0;
                            totalPass = 0;
                            submitResult = { status: null, code: data.code, detail: null, time: 0, memory: 0 };
                            return [4 /*yield*/, submission_service_1.default.createSubmission({
                                    token: data.token,
                                    problem: data.problem._id,
                                    userCode: submitResult.code,
                                    language: data.language
                                })];
                        case 1:
                            submisson = _a.sent();
                            switch (data.language) {
                                case 'java': {
                                    tempFilename = 'Main' + Number(new Date());
                                    data.code = "import java.util.*;\n".concat(data.code);
                                    data.code = data.code.replace(new RegExp('package[ ]{1,}[^ ]{1,}[ ]{0,};'), "");
                                    data.code = data.code.replace(new RegExp('public[ ]{1,}class[ ]{1,}[A-Za-z][A-Za-z0-9_-]{0,}[ ]{0,}{'), "public class ".concat(tempFilename, " {"));
                                    tempFilename += ".java";
                                    break;
                                }
                                case 'cpp': {
                                    data.code = (0, code_util_1.cppChangeContent)(data.code);
                                    tempFilename += ".cpp";
                                    break;
                                }
                                default: break;
                            }
                            tempFolder = path_1.default.join(__dirname, 'temps');
                            fs_1.default.writeFile(path_1.default.join(tempFolder, tempFilename), data.code, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (err)
                                        signale_1.default.error("System initial temporary file error: ".concat(err));
                                    else {
                                        (0, executes_1.compile)(tempFolder, tempFilename, data.language).then(function (compiled) { return __awaiter(_this, void 0, void 0, function () {
                                            var problemDetail, testcase_1, handleRunntest, i, length_1;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!compiled.status) return [3 /*break*/, 1];
                                                        submitResult.status = compiled.status;
                                                        submitResult.detail = compiled.detail;
                                                        submission_service_1.default.updateSubmission(submisson._id.toString(), {
                                                            memory: submitResult.memory,
                                                            executeTime: submitResult.time,
                                                            passPercent: passPercent,
                                                            detail: submitResult.detail,
                                                            status: submitResult.status
                                                        });
                                                        return [3 /*break*/, 3];
                                                    case 1: return [4 /*yield*/, problem_service_1.default.getDetail(data.problem._id)];
                                                    case 2:
                                                        problemDetail = _a.sent();
                                                        testcase_1 = problemDetail.problemCases;
                                                        handleRunntest = [];
                                                        for (i = 0, length_1 = testcase_1.length; i < length_1; i++) {
                                                            handleRunntest.push((0, executes_1.submit)(data.language, compiled.detail, testcase_1[i].input, tempFilename, tempFolder));
                                                        }
                                                        Promise.all(handleRunntest).then(function (runResult) {
                                                            var maxExecuteTime = 0;
                                                            var maxMemory = 0;
                                                            for (var i = 0, length_2 = runResult.length; i < length_2; i++) {
                                                                var runner = runResult[i];
                                                                maxExecuteTime = Math.max(maxExecuteTime, runner.time);
                                                                maxMemory = Math.max(maxMemory, runner.memory);
                                                                if (runner.status) {
                                                                    submitResult.status = runner.status;
                                                                    submitResult.time = runner.time;
                                                                    submitResult.memory = runner.memory;
                                                                    break;
                                                                }
                                                                else if (testcase_1[i].output.replace(/[ ]{0,}\r\n/g, '\n').trim() != runner.output.replace(/[ ]{0,}\r\n/g, '\n').trim()) {
                                                                    submitResult.status = app_object_1.AppObject.SUBMISSION_STATUS.WA;
                                                                    submitResult.time = maxExecuteTime;
                                                                    submitResult.memory = runner.memory;
                                                                }
                                                                else {
                                                                    totalPass++;
                                                                    passPercent = ((totalPass / length_2) * 100).toFixed(2);
                                                                }
                                                            }
                                                            if (!submitResult.status) {
                                                                submitResult.status = app_object_1.AppObject.SUBMISSION_STATUS.AC;
                                                                submitResult.time = maxExecuteTime;
                                                                submitResult.memory = maxMemory;
                                                            }
                                                            submission_service_1.default.updateSubmission(submisson._id.toString(), {
                                                                memory: submitResult.memory,
                                                                executeTime: submitResult.time,
                                                                passPercent: passPercent,
                                                                detail: submitResult.detail,
                                                                status: submitResult.status
                                                            });
                                                        }).finally(function () { return __awaiter(_this, void 0, void 0, function () {
                                                            var _a, _b;
                                                            return __generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        _c.trys.push([0, 8, , 9]);
                                                                        _a = data.language;
                                                                        switch (_a) {
                                                                            case "cpp": return [3 /*break*/, 1];
                                                                            case "java": return [3 /*break*/, 4];
                                                                        }
                                                                        return [3 /*break*/, 7];
                                                                    case 1: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename))];
                                                                    case 2:
                                                                        _c.sent();
                                                                        return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename.replace(".cpp", ".exe")))];
                                                                    case 3:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 4: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename))];
                                                                    case 5:
                                                                        _c.sent();
                                                                        return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename.replace(".java", ".class")))];
                                                                    case 6:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 7: return [3 /*break*/, 9];
                                                                    case 8:
                                                                        _b = _c.sent();
                                                                        return [3 /*break*/, 9];
                                                                    case 9:
                                                                        ;
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
            client.on(app_object_1.AppObject.SOCKET.RESPONSE.JOIN_CONTEST, function (data) {
                try {
                    contest_service_1.default.userJoinContest(data.token, data.contestId);
                }
                catch (_a) { }
            });
            client.on(app_object_1.AppObject.SOCKET.ACTIONS.SUBMIT_CONTEST, function (data) { return __awaiter(_this, void 0, void 0, function () {
                var uuid, tempFilename, passPercent, totalPass, submitResult, submisson, tempFolder;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, contest_service_1.default.checkUserContest(data.token, data.contest)];
                        case 1:
                            if (!(_a.sent())) {
                                return [2 /*return*/];
                            }
                            Object.assign(data, { code: "".concat(data.file) });
                            delete data.file;
                            uuid = require('uuid').v1();
                            tempFilename = uuid;
                            passPercent = 0;
                            totalPass = 0;
                            submitResult = { status: null, code: data.code, detail: null, time: 0, memory: 0 };
                            return [4 /*yield*/, submission_service_1.default.createSubmission({
                                    token: data.token,
                                    problem: data.problem._id,
                                    userCode: submitResult.code,
                                    language: data.language,
                                    contest: data.contest,
                                })];
                        case 2:
                            submisson = _a.sent();
                            return [4 /*yield*/, contest_service_1.default.userSubmit(data.token, data.contest, submisson._id.toString())];
                        case 3:
                            _a.sent();
                            switch (data.language) {
                                case 'java': {
                                    tempFilename = 'Main' + Number(new Date());
                                    data.code = data.code.replace(new RegExp('package[ ]{1,}[^ ]{1,}[ ]{0,};'), "");
                                    data.code = data.code.replace(new RegExp('public[ ]{1,}class[ ]{1,}[A-Za-z][A-Za-z0-9_-]{0,}[ ]{0,}{'), "public class ".concat(tempFilename, " {"));
                                    tempFilename += ".java";
                                    data.code = (0, code_util_1.javaChangeContent)(data.code);
                                }
                                case 'cpp': {
                                    data.code = (0, code_util_1.cppChangeContent)(data.code);
                                    tempFilename += ".cpp";
                                    break;
                                }
                                default: break;
                            }
                            tempFolder = path_1.default.join(__dirname, 'temps');
                            fs_1.default.writeFile(path_1.default.join(tempFolder, tempFilename), data.code, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (err)
                                        signale_1.default.error("System initial temporary file error: ".concat(err));
                                    else {
                                        (0, executes_1.compile)(tempFolder, tempFilename, data.language).then(function (compiled) { return __awaiter(_this, void 0, void 0, function () {
                                            var problemDetail, testcase_2, handleRunntest, i, length_3;
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!compiled.status) return [3 /*break*/, 1];
                                                        submitResult.status = compiled.status;
                                                        submitResult.detail = compiled.detail;
                                                        submission_service_1.default.updateSubmission(submisson._id.toString(), {
                                                            memory: submitResult.memory,
                                                            executeTime: submitResult.time,
                                                            passPercent: passPercent,
                                                            detail: submitResult.detail,
                                                            status: submitResult.status
                                                        });
                                                        return [3 /*break*/, 3];
                                                    case 1: return [4 /*yield*/, problem_service_1.default.getDetail(data.problem._id)];
                                                    case 2:
                                                        problemDetail = _a.sent();
                                                        testcase_2 = problemDetail.problemCases;
                                                        handleRunntest = [];
                                                        for (i = 0, length_3 = testcase_2.length; i < length_3; i++) {
                                                            handleRunntest.push((0, executes_1.submit)(data.language, compiled.detail, testcase_2[i].input, tempFilename, tempFolder));
                                                        }
                                                        Promise.all(handleRunntest).then(function (runResult) {
                                                            var maxExecuteTime = 0;
                                                            var maxMemory = 0;
                                                            for (var i = 0, length_4 = runResult.length; i < length_4; i++) {
                                                                var runner = runResult[i];
                                                                maxExecuteTime = Math.max(maxExecuteTime, runner.time);
                                                                maxMemory = Math.max(maxMemory, runner.memory);
                                                                if (runner.status) {
                                                                    submitResult.status = runner.status;
                                                                    submitResult.time = runner.time;
                                                                    submitResult.memory = runner.memory;
                                                                    break;
                                                                }
                                                                else if (testcase_2[i].output.replace(/[ ]{0,}\r\n/g, '\n').trim() != runner.output.replace(/[ ]{0,}\r\n/g, '\n').trim()) {
                                                                    submitResult.status = app_object_1.AppObject.SUBMISSION_STATUS.WA;
                                                                    submitResult.time = maxExecuteTime;
                                                                    submitResult.memory = runner.memory;
                                                                }
                                                                else {
                                                                    totalPass++;
                                                                    passPercent = ((totalPass / length_4) * 100).toFixed(2);
                                                                }
                                                            }
                                                            if (!submitResult.status) {
                                                                submitResult.status = app_object_1.AppObject.SUBMISSION_STATUS.AC;
                                                                submitResult.time = maxExecuteTime;
                                                                submitResult.memory = maxMemory;
                                                            }
                                                            submission_service_1.default.updateSubmission(submisson._id.toString(), {
                                                                memory: submitResult.memory,
                                                                executeTime: submitResult.time,
                                                                passPercent: passPercent,
                                                                detail: submitResult.detail,
                                                                status: submitResult.status
                                                            });
                                                        }).finally(function () { return __awaiter(_this, void 0, void 0, function () {
                                                            var _a, _b;
                                                            return __generator(this, function (_c) {
                                                                switch (_c.label) {
                                                                    case 0:
                                                                        _c.trys.push([0, 8, , 9]);
                                                                        _a = data.language;
                                                                        switch (_a) {
                                                                            case "cpp": return [3 /*break*/, 1];
                                                                            case "java": return [3 /*break*/, 4];
                                                                        }
                                                                        return [3 /*break*/, 7];
                                                                    case 1: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename))];
                                                                    case 2:
                                                                        _c.sent();
                                                                        return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename.replace(".cpp", ".exe")))];
                                                                    case 3:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 4: return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename))];
                                                                    case 5:
                                                                        _c.sent();
                                                                        return [4 /*yield*/, fs_1.default.unlinkSync(path_1.default.join(tempFolder, tempFilename.replace(".java", ".class")))];
                                                                    case 6:
                                                                        _c.sent();
                                                                        return [3 /*break*/, 7];
                                                                    case 7: return [3 /*break*/, 9];
                                                                    case 8:
                                                                        _b = _c.sent();
                                                                        return [3 /*break*/, 9];
                                                                    case 9:
                                                                        ;
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                            return [2 /*return*/];
                    }
                });
            }); });
            client.on('finish', function (data) {
                contest_service_1.default.userFinishContest(data.token, data.contest);
            });
            client.on(app_object_1.AppObject.SOCKET.ACTIONS.ACTION_RUNCODE, function (data) {
                var uuid = require('uuid').v1();
                var tempFilename = uuid;
                switch (data.language) {
                    case 'java': {
                        tempFilename = 'Main' + Number(new Date());
                        data.code = data.code.replace(new RegExp('package[ ]{1,}[^ ]{1,}[ ]{0,};'), "");
                        data.code = data.code.replace(new RegExp('public[ ]{1,}class[ ]{1,}[A-Za-z][A-Za-z0-9_-]{0,}[ ]{0,}{'), "public class ".concat(tempFilename, " {"));
                        tempFilename += ".java";
                        data.code = (0, code_util_1.javaChangeContent)(data.code);
                        break;
                    }
                    case 'cpp': {
                        tempFilename += ".cpp";
                        data.code = (0, code_util_1.cppChangeContent)(data.code);
                        break;
                    }
                    default: break;
                }
                var tempFolder = path_1.default.join(__dirname, 'temps');
                fs_1.default.writeFile(path_1.default.join(tempFolder, tempFilename), data.code, function (err) {
                    if (err)
                        signale_1.default.error("System initial temporary file error: ".concat(err));
                    else {
                        (0, executes_1.executeFile)(client, tempFolder, tempFilename, data.language, data.input);
                    }
                });
            });
            return [2 /*return*/];
        });
    }); });
    return server;
}
exports.default = initialSocket;
