"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashInformation = void 0;
var crypto_1 = require("crypto");
function hashInformation(input) {
    return (0, crypto_1.createHash)('SHA256').update(input).digest('hex');
}
exports.hashInformation = hashInformation;
