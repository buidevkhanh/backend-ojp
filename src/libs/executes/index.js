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
exports.submit = exports.compile = exports.executeFile = void 0;
var child_process_1 = __importDefault(require("child_process"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var app_object_1 = require("../../commons/app.object");
function executeFile(client, folder, filename, language, input, className) {
    return __awaiter(this, void 0, void 0, function () {
        var errorStr_1, compiledPath_1, args, compiler, args, compiler, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (language) {
                case 'cpp': {
                    errorStr_1 = "";
                    compiledPath_1 = path_1.default.join(folder, "".concat(filename.split(".")[0], ".exe"));
                    args = ['-o', "".concat(compiledPath_1), "".concat(path_1.default.join(folder, filename))];
                    compiler = child_process_1.default.spawn("g++", args, { timeout: 10000 });
                    compiler.unref();
                    compiler.stderr.on("data", function (data) {
                        errorStr_1 += "".concat(data);
                        errorStr_1 = errorStr_1.replaceAll(path_1.default.join(folder, filename) + ":", "");
                    });
                    compiler.on('close', function (code) {
                        if (code === 0) {
                            var dataStr_1 = "";
                            client.emit(app_object_1.AppObject.SOCKET.RESPONSE.RESPONSE_RUNCODE, { isCompile: true, output: null, error: null });
                            var runner = child_process_1.default.spawn(compiledPath_1, { timeout: 20000 });
                            runner.unref();
                            var perf_1 = require('execution-time')();
                            perf_1.start();
                            if (input.trim()) {
                                runner.stdin.write(input);
                                runner.stdin.end();
                            }
                            runner.stdout.on("data", function (data) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    dataStr_1 = dataStr_1.replaceAll(path_1.default.join(folder, filename) + ":", "");
                                    dataStr_1 += "".concat(data);
                                    return [2 /*return*/];
                                });
                            }); });
                            runner.on('close', function (code, signal) { return __awaiter(_this, void 0, void 0, function () {
                                var executeTime;
                                return __generator(this, function (_a) {
                                    if (signal === "SIGTERM") {
                                        client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: null, error: "Time limited execeeded", time: '>4', memory: 0 });
                                    }
                                    else if (code !== 0) {
                                        client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: null, error: "Runtime error", time: 0, memory: 0 });
                                    }
                                    executeTime = Math.floor(perf_1.stop().time / 10);
                                    client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: dataStr_1, error: null, time: executeTime / 100, memory: 0 });
                                    try {
                                        fs_1.default.unlinkSync(path_1.default.join(folder, filename));
                                        fs_1.default.unlinkSync(compiledPath_1);
                                    }
                                    catch (_b) { }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        else {
                            client.emit(app_object_1.AppObject.SOCKET.RESPONSE.RESPONSE_RUNCODE, { isCompile: false, output: null, error: errorStr_1, memory: 0, time: 0 });
                            try {
                                fs_1.default.unlinkSync(path_1.default.join(folder, filename));
                            }
                            catch (_a) { }
                        }
                    });
                    break;
                }
                case 'java': {
                    args = ["".concat(path_1.default.join(folder, filename))];
                    compiler = child_process_1.default.spawn("javac", args, { timeout: 10000 });
                    compiler.unref();
                    error_1 = '';
                    compiler.on('close', function (code) {
                        if (code == 0) {
                            var dataStr_2 = "";
                            var runargs = ["".concat(filename.replace(".java", ""))];
                            client.emit(app_object_1.AppObject.SOCKET.RESPONSE.RESPONSE_RUNCODE, { isCompile: true, output: null, error: null });
                            var runner = child_process_1.default.spawn("java", runargs, { timeout: 20000, cwd: path_1.default.normalize(folder) });
                            runner.unref();
                            var perf_2 = require('execution-time')();
                            perf_2.start();
                            if (input) {
                                runner.stdin.write(input);
                                runner.stdin.end();
                            }
                            runner.stdout.on("data", function (data) {
                                dataStr_2 += "".concat(data);
                                dataStr_2 = dataStr_2.replaceAll(path_1.default.join(folder, filename) + ":", "");
                            });
                            runner.on('close', function (code, signal) {
                                if (code === 143 || signal === "SIGTERM") {
                                    client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: null, error: "Time limited execeeded", time: '4', memory: 0 });
                                }
                                else if (code !== 0) {
                                    client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: null, error: "Runtime error", time: 0, memory: 0 });
                                }
                                ;
                                var executeTime = Math.floor(perf_2.stop().time / 10);
                                client.emit(app_object_1.AppObject.SOCKET.RESPONSE.OUTPUT_RUNCODE, { isCompile: true, output: "".concat(dataStr_2), error: null, time: executeTime / 100, memory: 0 });
                                try {
                                    fs_1.default.unlinkSync(path_1.default.join(folder, filename));
                                    fs_1.default.unlinkSync(path_1.default.join(folder, filename.replace(".java", ".class")));
                                }
                                catch (error) {
                                    require('signale').error('Unlink error, please check');
                                }
                            });
                        }
                        else {
                            client.emit(app_object_1.AppObject.SOCKET.RESPONSE.RESPONSE_RUNCODE, { isCompile: false, output: null, error: error_1, memory: 0, time: 0 });
                            try {
                                fs_1.default.unlinkSync(path_1.default.join(folder, filename));
                            }
                            catch (_a) {
                                console.log('unlink error');
                            }
                        }
                    });
                    compiler.stderr.on('data', function (data) {
                        var errorStr = "".concat(data);
                        errorStr = errorStr.replaceAll(path_1.default.join(folder, filename) + ":", "");
                        error_1 += errorStr;
                    });
                    break;
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.executeFile = executeFile;
function compile(folder, filename, language) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (language) {
                case 'cpp': {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var compiledPath = path_1.default.join(folder, "".concat(filename.split(".")[0], ".exe"));
                            var args = ['-o', "".concat(compiledPath), "".concat(path_1.default.join(folder, filename))];
                            var compiler = child_process_1.default.spawn("g++", args, { shell: true, windowsHide: true, timeout: 10000 });
                            compiler.stderr.on('data', function (data) {
                                var errorStr = "".concat(data);
                                errorStr = errorStr.replaceAll(path_1.default.join(folder, filename) + ":", "");
                                resolve({
                                    status: app_object_1.AppObject.SUBMISSION_STATUS.CE,
                                    detail: errorStr
                                });
                            });
                            compiler.on('close', function (code) {
                                if (code == 0) {
                                    resolve({
                                        status: null,
                                        detail: compiledPath
                                    });
                                }
                            });
                        })];
                }
                case 'java': {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var args = ['-Xlint:unchecked', "".concat(path_1.default.join(folder, filename))];
                            var compiler = child_process_1.default.spawn("javac", args, { timeout: 20000 });
                            var errorStr = "";
                            compiler.unref();
                            compiler.stderr.on('data', function (data) {
                                var dataError = "".concat(data);
                                errorStr += dataError.replaceAll(path_1.default.join(folder, filename) + ":", "");
                            });
                            compiler.on('close', function (code) {
                                if (code === 0)
                                    resolve({
                                        status: null,
                                        detail: null
                                    });
                                resolve({
                                    status: app_object_1.AppObject.SUBMISSION_STATUS.CE,
                                    detail: errorStr
                                });
                            });
                        })];
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.compile = compile;
function submit(language, compiledPath, input, filename, folder) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (language) {
                case 'cpp': {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var runner = child_process_1.default.spawn(compiledPath, { timeout: 20000 });
                            var dataStr = "";
                            runner.unref();
                            var perf = require('execution-time')();
                            perf.start();
                            if (input) {
                                runner.stdin.write(input);
                                runner.stdin.end();
                            }
                            runner.stdout.on("data", function (data) {
                                dataStr += "".concat(data);
                            });
                            runner.on('close', function (code, signal) {
                                if (signal === "SIGTERM") {
                                    resolve({
                                        output: null,
                                        status: app_object_1.AppObject.SUBMISSION_STATUS.TLE,
                                        detail: null,
                                        time: 4,
                                        memory: 0
                                    });
                                }
                                else if (code !== 0) {
                                    resolve({
                                        output: null,
                                        status: app_object_1.AppObject.SUBMISSION_STATUS.RTE,
                                        detail: null,
                                        time: 0,
                                        memory: 0
                                    });
                                }
                                var executeTime = Math.floor(perf.stop().time / 10);
                                resolve({
                                    output: dataStr,
                                    status: null,
                                    detail: null,
                                    time: executeTime / 100,
                                    memory: 0
                                });
                            });
                        })];
                }
                case 'java': {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var runargs = ["".concat(filename.replace(".java", ""))];
                            var runner = child_process_1.default.spawn("java", runargs, { cwd: path_1.default.join(folder, '') });
                            var dataStr = "";
                            runner.unref();
                            var perf = require('execution-time')();
                            perf.start();
                            if (input) {
                                runner.stdin.write(input);
                                runner.stdin.end();
                            }
                            runner.stdout.on("data", function (data) {
                                dataStr += "".concat(data);
                            });
                            runner.stderr.on("data", function (data) {
                                console.log("".concat(data));
                            });
                            runner.on('close', function (code, signal) {
                                if (code === 143) {
                                    resolve({
                                        output: null,
                                        status: app_object_1.AppObject.SUBMISSION_STATUS.TLE,
                                        detail: null,
                                        time: 4,
                                        memory: 0
                                    });
                                }
                                else if (code !== 0) {
                                    resolve({
                                        output: null,
                                        status: app_object_1.AppObject.SUBMISSION_STATUS.RTE,
                                        detail: null,
                                        time: 0,
                                        memory: 0
                                    });
                                }
                                var executeTime = Math.floor(perf.stop().time / 10);
                                resolve({
                                    output: dataStr,
                                    status: null,
                                    detail: null,
                                    time: executeTime / 100,
                                    memory: 0
                                });
                            });
                        })];
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.submit = submit;
