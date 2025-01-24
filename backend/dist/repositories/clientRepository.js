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
class ClientRepository {
    create(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO clients (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [client.name, client.email, client.phone, client.address]);
            return result.rows[0];
        });
    }
    findAll(filter, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            let query = `SELECT * FROM clients`;
            let totalQuery = `SELECT COUNT(*) FROM clients`;
            const values = [];
            if (filter.name) {
                query += ` WHERE name ILIKE $1`;
                totalQuery += ` WHERE name ILIKE $1`;
                values.push(`%${filter.name}%`);
            }
            query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
            values.push(limit, offset);
            const result = yield db_1.default.query(query, values);
            const totalResult = yield db_1.default.query(totalQuery, filter.name ? [`%${filter.name}%`] : []);
            return {
                clients: result.rows,
                total: parseInt(totalResult.rows[0].count, 10),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM clients WHERE id = $1', [
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    update(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = Object.keys(client);
            const values = Object.values(client);
            if (fields.length === 0) {
                throw new Error('No fields to update');
            }
            const setClause = fields
                .map((field, index) => `${field} = $${index + 1}`)
                .join(', ');
            const query = `UPDATE clients SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;
            const result = yield db_1.default.query(query, [...values, id]);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
            return result.rowCount !== null && result.rowCount > 0;
        });
    }
}
exports.default = new ClientRepository();
