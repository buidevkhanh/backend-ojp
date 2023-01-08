"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
var joi_1 = __importDefault(require("joi"));
exports.adminLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default
        .string()
        .regex(new RegExp("^[-a-zA-Z0-9/_!?.#$@&*()|]{8,}$"))
        .messages({
        'string.pattern.base': 'password length between 8 and 20 charactors, contains letters or number or special charactor',
    })
        .required(),
});
