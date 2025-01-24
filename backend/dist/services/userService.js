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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
class UserService {
    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
            user.password = hashedPassword;
            const newUser = yield userRepository_1.default.create(user);
            return newUser;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository_1.default.findByEmail(email);
            if (!user)
                throw new Error('Invalid credentials');
            const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordValid)
                throw new Error('Invalid credentials');
            const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, this.JWT_SECRET, {
                expiresIn: '1y',
            });
            return token;
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, this.JWT_SECRET);
        });
    }
}
exports.default = new UserService();
