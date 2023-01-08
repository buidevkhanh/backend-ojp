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
Object.defineProperty(exports, "__esModule", { value: true });
var signale = __importStar(require("signale"));
var mongoose = __importStar(require("mongoose"));
var environment_1 = require("../environment");
var mongoUri = "".concat(environment_1.envConfigs.DATABASE_CONFIG.DATABASE_PREFIX, "://").concat(environment_1.envConfigs.DATABASE_CONFIG.DATABASE_USERNAME, ":").concat(environment_1.envConfigs.DATABASE_CONFIG.DATABASE_PASSWORD, "@").concat(environment_1.envConfigs.DATABASE_CONFIG.DATABASE_HOST);
var connectionOptions = {
    user: environment_1.envConfigs.DATABASE_CONFIG.DATABASE_USERNAME,
    pass: environment_1.envConfigs.DATABASE_CONFIG.DATABASE_PASSWORD,
    dbName: environment_1.envConfigs.DATABASE_CONFIG.DATABASE_NAME,
};
function default_1() {
    connectDB();
}
exports.default = default_1;
function connectDB(callback) {
    if (typeof callback !== 'function')
        callback = function () { };
    var connectBefore = false;
    function connect() {
        if (connectBefore) {
            signale.await('[Database] reconnecting ...');
        }
        mongoose.connect(mongoUri, connectionOptions).then(function () { return callback; });
    }
    connect();
    mongoose.connections.forEach(function (connection) {
        return connection.on('error', function () {
            signale.error('[Database] connect to database failed');
        });
    });
    mongoose.connections.forEach(function (connection) {
        return connection.on('disconnected', function () {
            signale.error('[Database] lost connect');
            if (!connectBefore) {
                setTimeout(connect, 5000);
            }
        });
    });
    mongoose.connections.forEach(function (connection) {
        return connection.on('connected', function () {
        });
    });
    mongoose.connections.forEach(function (connection) {
        return connection.on('reconnected', function () {
            signale.success('[Database] database reconnected');
        });
    });
}
