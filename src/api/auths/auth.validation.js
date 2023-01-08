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
exports.regisValidation = exports.loginValidation = void 0;
var joi = __importStar(require("joi"));
var app_object_1 = require("../../commons/app.object");
exports.loginValidation = joi.object({
    nameOrEmail: joi
        .string()
        .trim()
        .required()
        .messages({ 'string.empty': 'username or email is not empty' }),
    password: joi
        .string()
        .regex(new RegExp("^[-a-zA-Z0-9/_!?.#$@&*()|]{8,}$"))
        .messages({
        'string.pattern.base': 'password length between 8 and 20 charactors, contains letters or number or special charactor',
    })
        .required(),
});
exports.regisValidation = joi.object({
    username: joi
        .string()
        .trim()
        .required()
        .min(6)
        .messages({ 'string.empty': 'username is not empty' }),
    userPass: joi
        .string()
        .regex(new RegExp("^[-a-zA-Z0-9/_!?.#$@&*()|]{8,}$"))
        .messages({
        'string.pattern.base': 'password length between 8 and 20 charactors, contains letters or number or special charactor',
    })
        .required(),
    userEmail: joi
        .string()
        .email()
        .messages({ 'string.email': "email must be valid email" })
        .required(),
    role: joi
        .string()
        .valid(app_object_1.AppObject.ROLES.STUDENT, app_object_1.AppObject.ROLES.TEACHER)
        .required(),
    displayName: joi
        .string()
        .pattern(new RegExp("^[a-zA-Z ]{3,}"))
        .messages({
        'string.pattern.base': 'display name must be include letters and space',
    })
        .required(),
});
