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
const projectRepository_1 = __importDefault(require("../repositories/projectRepository"));
class ProjectService {
    createProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            return projectRepository_1.default.create(project);
        });
    }
    getProjects(clientId_1, name_1) {
        return __awaiter(this, arguments, void 0, function* (clientId, name, page = 1, limit = 10) {
            return projectRepository_1.default.findAll(clientId, name, page, limit);
        });
    }
    getProjectById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return projectRepository_1.default.findById(id);
        });
    }
    updateProject(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            return projectRepository_1.default.update(id, project);
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return projectRepository_1.default.delete(id);
        });
    }
}
exports.default = new ProjectService();
