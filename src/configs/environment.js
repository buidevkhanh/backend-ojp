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
exports.envConfigs = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: "".concat(__dirname, "/.env") });
exports.envConfigs = {
    ENV_FILE_PATH: "".concat(__dirname, "/.env"),
    DATABASE_CONFIG: {
        DATABASE_HOST: process.env.MONGODB_DEFAULT_HOST + '',
        DATABASE_PREFIX: process.env.MONGODB_DEFAULT_PREFIX + '',
        DATABASE_USERNAME: process.env.MONGODB_DEFAULT_USER + '',
        DATABASE_PASSWORD: process.env.MONGODB_DEFAULT_PASS + '',
        DATABASE_NAME: process.env.MONGODB_APP_DATABASE + '',
    },
    EMAIL_CONFIG: {
        VERIFY_EMAIL: "src/templates/verify-email.template.hbs",
    },
    JWT_SECRET: process.env.JWT_SECRET + '',
    ACCESS_TOKEN_EXPIRED: process.env.ACCESS_TOKEN_EXPIRED + '',
    REFRESH_TOKEN_EXPIRED: process.env.REFERSH_TOKEN_EXPIRED + '',
    CLOUD_NAME: process.env.CLOUD_NAME + '',
    CLOUD_API_KEY: process.env.CLOUD_API_KEY + '',
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET + '',
};
