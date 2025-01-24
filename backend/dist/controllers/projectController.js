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
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjects = exports.createProject = void 0;
const projectService_1 = __importDefault(require("../services/projectService"));
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projectService_1.default.createProject(req.body);
        res.status(201).json(project);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createProject = createProject;
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clientId, name, page = 1, limit = 10 } = req.query;
        const { projects, total } = yield projectService_1.default.getProjects(clientId ? Number(clientId) : undefined, name, Number(page), Number(limit));
        res.status(200).json({ projects, total });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield projectService_1.default.getProjectById(Number(id));
        if (!project) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.getProjectById = getProjectById;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedProject = yield projectService_1.default.updateProject(Number(id), req.body);
        if (!updatedProject) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.status(200).json(updatedProject);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield projectService_1.default.deleteProject(Number(id));
        if (!deleted) {
            res.status(404).json({ error: 'Project not found' });
            return;
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteProject = deleteProject;
