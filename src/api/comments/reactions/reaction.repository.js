"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionRepository = void 0;
var mongoose_repository_1 = require("../../../libs/databases/mongoose.repository");
var reaction_collection_1 = __importDefault(require("./reaction.collection"));
var ReactionORM = /** @class */ (function (_super) {
    __extends(ReactionORM, _super);
    function ReactionORM() {
        return _super.call(this, reaction_collection_1.default) || this;
    }
    return ReactionORM;
}(mongoose_repository_1.MongooseRepository));
exports.ReactionRepository = new ReactionORM();
