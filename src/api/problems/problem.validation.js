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
exports.createProblem = void 0;
var joi = __importStar(require("joi"));
var app_object_1 = require("../../commons/app.object");
exports.createProblem = joi.object({
    problemName: joi.string().min(1).required(),
    problemLevel: joi
        .string()
        .required()
        .valid(app_object_1.AppObject.PROBLEM_LEVEL.EASY, app_object_1.AppObject.PROBLEM_LEVEL.MEDIUM),
    problemCategory: joi
        .string()
        .regex(/^[0-9a-f]{24}$/i)
        .required()
        .messages({ 'string.base.partern': 'Invalid Id format' }),
    problemQuestion: joi.string().required(),
    expectedInput: joi.string().optional().allow(''),
    expectedOutput: joi.string().optional().allow(''),
    problemScope: joi
        .string()
        .valid(app_object_1.AppObject.APP_SCOPES.CLASS, app_object_1.AppObject.APP_SCOPES.PUBLIC),
    problemCases: joi
        .array()
        .items(joi.object({
        input: joi.string().optional().allow(''),
        output: joi.string().optional().allow(''),
    }))
        .required(),
});