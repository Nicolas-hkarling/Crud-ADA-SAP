"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Professional_1 = __importDefault(require("./Professional"));
class Teacher extends Professional_1.default {
    constructor(id, name, birthday, address, role, payment, subject) {
        super(id, name, birthday, address, role, payment);
        this.subject = subject;
    }
}
exports.default = Teacher;
