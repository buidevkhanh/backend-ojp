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
var mongoose = __importStar(require("mongoose"));
var app_object_1 = require("../../commons/app.object");
var ProblemModelSchema = new mongoose.Schema({
    problemName: { type: String, required: true },
    problemCode: { type: String, required: true },
    problemLevel: {
        type: String,
        enum: Object.values(app_object_1.AppObject.PROBLEM_LEVEL),
    },
    problemCategory: { type: mongoose.Types.ObjectId },
    problemQuestion: { type: String, required: true },
    expectedInput: { type: String, default: 'No input' },
    expectedOutput: { type: String, default: 'No output' },
    problemScope: {
        type: String,
        enum: Object.values(app_object_1.AppObject.APP_SCOPES),
        default: app_object_1.AppObject.APP_SCOPES.PUBLIC,
    },
    problemCases: {
        type: [mongoose.Types.ObjectId],
        ref: app_object_1.AppObject.MONGO.COLLECTION.TESTCASES,
    },
    status: {
        type: String,
        enum: Object.values(app_object_1.AppObject.PROBLEM_STATUS),
        default: app_object_1.AppObject.PROBLEM_STATUS.PENDING,
    },
    score: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
});
var ProblemModel = mongoose.model(app_object_1.AppObject.MONGO.COLLECTION.PROBLEMS, ProblemModelSchema);
exports.default = ProblemModel;
