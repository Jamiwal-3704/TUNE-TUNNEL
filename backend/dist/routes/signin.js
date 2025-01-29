"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const medium_common_1 = require("@decoded-satapathy/medium-common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.signInRouter = express_1.default.Router();
exports.signInRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    const body = req.body;
    const { success } = medium_common_1.signinInput.safeParse(body);
    if (!success) {
        return res.status(403).json({ "msg": "Invalid input" });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email: body.email,
            },
            select: {
                name: true,
                id: true,
                password: true,
                email: true
            }
        });
        if (user) {
            bcrypt_1.default.compare(body.password, user === null || user === void 0 ? void 0 : user.password, (err, result) => {
                if (!result) {
                    return res.status(403).json({ msg: "Wrong password" });
                }
            });
        }
        // console.log(user);
        if (user && process.env.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
            return res.status(200).json({ token: token, id: user.id });
        }
        else {
            return res.status(404).json({ msg: "User doesn't exist or Wrong jwt" });
        }
    }
    catch (e) {
        return res.status(500).json({ msg: "Some error occured" });
    }
}));
