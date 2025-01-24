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
class ContactRepository {
    create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *', [contact.name, contact.email, contact.phone]);
            return result.rows[0];
        });
    }
    findAll(page, limit, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            let query = `SELECT * FROM contacts`;
            let totalQuery = `SELECT COUNT(*) FROM contacts`;
            const values = [];
            if (name) {
                query += ` WHERE name = $1`;
                totalQuery += ` WHERE name = $1`;
                values.push(name);
            }
            query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
            values.push(limit, offset);
            const result = yield db_1.default.query(query, values);
            const totalResult = yield db_1.default.query(totalQuery, values.slice(0, values.length - 2));
            return {
                contacts: result.rows,
                total: parseInt(totalResult.rows[0].count, 10),
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM contacts WHERE id = $1', [
                id,
            ]);
            return result.rows[0] || null;
        });
    }
    update(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = [];
            const values = [];
            let query = 'UPDATE contacts SET ';
            Object.entries(updates).forEach(([key, value], index) => {
                fields.push(`${key} = $${index + 1}`);
                values.push(value);
            });
            query +=
                fields.join(', ') +
                    ', updated_at = CURRENT_TIMESTAMP WHERE id = $' +
                    (values.length + 1) +
                    ' RETURNING *';
            values.push(id);
            const result = yield db_1.default.query(query, values);
            return result.rows[0] || null;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('DELETE FROM contacts WHERE id = $1 RETURNING *', [id]);
            return result.rowCount !== null && result.rowCount > 0;
        });
    }
}
exports.default = new ContactRepository();
