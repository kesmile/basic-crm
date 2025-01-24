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
class ProjectRepository {
    create(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO projects (client_id, name, description, status) VALUES ($1, $2, $3, $4) RETURNING *', [project.client_id, project.name, project.description, project.status]);
            return result.rows[0];
        });
    }
    findAll(clientId_1, name_1) {
        return __awaiter(this, arguments, void 0, function* (clientId, name, page = 1, limit = 10) {
            const offset = (page - 1) * limit;
            let query = `SELECT * FROM projects`;
            let totalQuery = `SELECT COUNT(*) FROM projects`;
            const values = [];
            if (clientId) {
                query += ` WHERE client_id = $1`;
                totalQuery += ` WHERE client_id = $1`;
                values.push(clientId);
            }
            if (name) {
                query += clientId ? ` AND` : ` WHERE`;
                query += ` name ILIKE $${values.length + 1}`;
                totalQuery += clientId ? ` AND` : ` WHERE`;
                totalQuery += ` name ILIKE $${values.length + 1}`;
                values.push(`%${name}%`);
            }
            query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
            values.push(limit, offset);
            const result = yield db_1.default.query(query, values);
            const totalResult = yield db_1.default.query(totalQuery, values.slice(0, values.length - 2));
            return {
                projects: result.rows,
                total: parseInt(totalResult.rows[0].count, 10),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM projects WHERE id = $1', [
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    update(id, project) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(project);
            const values = Object.values(project);
            if (fields.length === 0) {
                throw new Error('No fields to update');
            }
            const setClause = fields
                .map((field, index) => `${field} = $${index + 1}`)
                .join(', ');
            const query = `UPDATE projects SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;
            const result = yield db_1.default.query(query, [...values, id]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield db_1.default.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
            return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
        });
    }
}
exports.default = new ProjectRepository();
