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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var signale = __importStar(require("signale"));
var dotenv = __importStar(require("dotenv"));
var environment_1 = require("./src/configs/environment");
var databases_1 = __importDefault(require("./src/configs/databases"));
var route_1 = __importDefault(require("./src/configs/route"));
var middleware_1 = __importDefault(require("./src/configs/middleware"));
var error_1 = __importDefault(require("./src/configs/error"));
var sockets_1 = __importDefault(require("./src/libs/sockets"));
var contest_service_1 = __importDefault(require("./src/api/contests/contest.service"));
var app = (0, express_1.default)();
dotenv.config({ path: environment_1.envConfigs.ENV_FILE_PATH });
signale.success("[App] environment config successful");
(0, databases_1.default)();
(0, middleware_1.default)(app);
signale.success("[App] middleware config successful");
(0, route_1.default)(app);
(0, error_1.default)(app);
signale.success("[App] error handling config successful");
var server = (0, sockets_1.default)(app);
signale.success("[App] Socket initial successful");
var CrobJob = require('cron').CronJob;
new CrobJob('*/1 * * * *', function () {
    contest_service_1.default.autoEndContest();
}).start();
server.listen(process.env.OJP_DEFAULT_PORT, function () {
    signale.success("[App] server started on port: ".concat(process.env.OJP_DEFAULT_PORT));
});
exports.default = app;
