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
var SubmissionSchema = new mongoose.Schema({
    problem: { type: mongoose.Types.ObjectId, ref: app_object_1.AppObject.MONGO.COLLECTION.PROBLEMS },
    user: { type: mongoose.Types.ObjectId, ref: app_object_1.AppObject.MONGO.COLLECTION.USERS },
    userCode: { type: String },
    language: { type: String, default: 'cpp' },
    memory: { type: Number, default: 0 },
    executeTime: { type: Number, default: 0 },
    passPercent: { type: Number, default: 0 },
    detail: { type: String, require: false, default: '' },
    status: { type: String, enum: Object.values(app_object_1.AppObject.SUBMISSION_STATUS), default: app_object_1.AppObject.SUBMISSION_STATUS.PENDING },
    contest: { type: mongoose.Types.ObjectId, require: false }
}, {
    timestamps: true,
});
var SubmissionModel = mongoose.model(app_object_1.AppObject.MONGO.COLLECTION.SUBMISSIONS, SubmissionSchema);
exports.default = SubmissionModel;
