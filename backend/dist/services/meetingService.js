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
const meetingRepository_1 = __importDefault(require("../repositories/meetingRepository"));
class MeetingService {
    createMeeting(meeting) {
        return __awaiter(this, void 0, void 0, function* () {
            return meetingRepository_1.default.create(meeting);
        });
    }
    getMeetings(projectId_1, title_1) {
        return __awaiter(this, arguments, void 0, function* (projectId, title, page = 1, limit = 10) {
            return meetingRepository_1.default.findAll(projectId);
        });
    }
    getMeetingById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return meetingRepository_1.default.findById(id);
        });
    }
    updateMeeting(id, meeting) {
        return __awaiter(this, void 0, void 0, function* () {
            return meetingRepository_1.default.update(id, meeting);
        });
    }
    deleteMeeting(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return meetingRepository_1.default.delete(id);
        });
    }
}
exports.default = new MeetingService();
