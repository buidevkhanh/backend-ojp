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
var ContestQuestion = new mongoose.Schema({
    problem: { type: mongoose.Types.ObjectId, ref: app_object_1.AppObject.MONGO.COLLECTION.PROBLEMS },
    score: { type: Number, required: true }
}, { _id: false });
var ContestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    visibility: { type: String, enum: ["public", "private"], default: 'public' },
    beginAt: { type: Date, require: true },
    duration: { type: Number, require: true },
    closeAt: { type: Date, require: true },
    user: { type: [mongoose.Types.ObjectId], ref: app_object_1.AppObject.MONGO.COLLECTION.USERS },
    questions: [ContestQuestion],
    limitedMember: { type: Number, required: false }
}, {
    timestamps: true,
});
var ContestModel = mongoose.model(app_object_1.AppObject.MONGO.COLLECTION.CONTESTS, ContestSchema);
exports.default = ContestModel;
