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
const db_1 = __importDefault(require("../utils/db"));
class MeetingRepository {
    // Create a new meeting
    create(meeting) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO meetings (project_id, title, date, time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *', [meeting.project_id, meeting.title, meeting.date, meeting.time, meeting.notes]);
            return result.rows[0];
        });
    }
    // Get all meetings, optionally filtered by project_id
    findAll(projectId_1, title_1) {
        return __awaiter(this, arguments, void 0, function* (projectId, title, page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            let query = `SELECT * FROM meetings`;
            let totalQuery = `SELECT COUNT(*) FROM meetings`;
            const values = [];
            if (projectId) {
                query += ` WHERE project_id = $1`;
                totalQuery += ` WHERE project_id = $1`;
                values.push(projectId);
            }
            if (title) {
                query += projectId ? ` AND` : ` WHERE`;
                query += ` title ILIKE $${values.length + 1}`;
                totalQuery += projectId ? ` AND` : ` WHERE`;
                totalQuery += ` title ILIKE $${values.length + 1}`;
                values.push(`%${title}%`);
            }
            query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
            values.push(limit, offset);
            const result = yield db_1.default.query(query, values);
            const totalResult = yield db_1.default.query(totalQuery, values.slice(0, values.length - 2));
            return {
                meetings: result.rows,
                total: parseInt(totalResult.rows[0].count, 10),
            };
        });
    }
    // Get a meeting by ID
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM meetings WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
    }
    // Update a meeting
    update(id, meeting) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`UPDATE meetings 
       SET title = $1, date = $2, time = $3, notes = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 
       RETURNING *`, [meeting.title, meeting.date, meeting.time, meeting.notes, id]);
            return result.rows[0] || null;
        });
    }
    // Delete a meeting
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('DELETE FROM meetings WHERE id = $1 RETURNING *', [id]);
            return result.rowCount !== null && result.rowCount > 0;
        });
    }
}
exports.default = new MeetingRepository();
