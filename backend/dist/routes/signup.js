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
exports.signUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const medium_common_1 = require("@decoded-satapathy/medium-common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.signUpRouter = express_1.default.Router();
const saltRounds = 10;
exports.signUpRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { success } = medium_common_1.signupInput.safeParse(body);
    if (!success) {
        return res.status(411).json({ msg: "Wrong input" });
    }
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    }).$extends((0, extension_accelerate_1.withAccelerate)());
    try {
        const doesUserExists = yield prisma.user.findUnique({
            where: {
                email: body.email
            }
        });
        if (doesUserExists) {
            return res.status(409).json({ msg: "Account already with same email" });
        }
        // let user: User | null = {
        //   id: "",
        //   email: "",
        //   password: "",
        //   name: ""
        // };
        bcrypt_1.default.hash(body.password, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield prisma.user.create({
                data: {
                    email: body.email,
                    password: hash,
                    name: body.name
                }
            });
            console.log(user);
            if (process.env.JWT_SECRET) {
                if (user.id !== "") {
                    const token = jsonwebtoken_1.default.sign(user.id, process.env.JWT_SECRET);
                    return res.status(200).json({ token: token });
                }
                else {
                    return res.status(500).json({ msg: "User's ID is empty" });
                }
            }
            else {
                return res.status(500).json({ msg: "JWT secret missing" });
            }
        }));
    }
    catch (e) {
        return res.status(500).json({ msg: "Something went wrong" });
    }
}));
