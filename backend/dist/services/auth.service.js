"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signup = async (id, password) => {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (existing)
        throw new Error("이미 존재하는 ID입니다.");
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            id,
            password: hashed,
        },
    });
    return { id: user.id };
};
exports.signup = signup;
const login = async (id, password) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
        throw new Error("존재하지 않는 사용자입니다.");
    const valid = await bcrypt_1.default.compare(password, user.password);
    if (!valid)
        throw new Error("비밀번호가 일치하지 않습니다.");
    const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
exports.login = login;
