"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var environment_1 = require("../configs/environment");
function signToken(payload, ttl) {
    return jsonwebtoken_1.default.sign(payload, environment_1.envConfigs.JWT_SECRET, { expiresIn: ttl });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, environment_1.envConfigs.JWT_SECRET);
}
exports.default = {
    signToken: signToken,
    verifyToken: verifyToken,
};
