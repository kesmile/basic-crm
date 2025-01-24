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
exports.deleteMeeting = exports.updateMeeting = exports.getMeetingById = exports.getMeetings = exports.createMeeting = void 0;
const meetingService_1 = __importDefault(require("../services/meetingService"));
const createMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meeting = yield meetingService_1.default.createMeeting(req.body);
        res.status(201).json(meeting);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createMeeting = createMeeting;
const getMeetings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId, title, page = 1, limit = 10 } = req.query;
        const { meetings, total } = yield meetingService_1.default.getMeetings(projectId ? Number(projectId) : undefined, title, Number(page), Number(limit));
        res.status(200).json({ meetings, total });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getMeetings = getMeetings;
const getMeetingById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const meeting = yield meetingService_1.default.getMeetingById(Number(id));
        if (!meeting) {
            res.status(404).json({ error: 'Meeting not found' });
            return;
        }
        res.status(200).json(meeting);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.getMeetingById = getMeetingById;
const updateMeeting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedMeeting = yield meetingService_1.default.updateMeeting(Number(id), req.body);
        if (!updatedMeeting) {
            res.status(404).json({ error: 'Meeting not found' });
            return;
        }
        res.status(200).json(updatedMeeting);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.updateMeeting = updateMeeting;
const deleteMeeting = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield meetingService_1.default.deleteMeeting(Number(id));
        if (!deleted) {
            res.status(404).json({ error: 'Meeting not found' });
            return;
        }
        res.status(200).json({ message: 'Meeting deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteMeeting = deleteMeeting;
