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
exports.deleteClient = exports.updateClient = exports.getClients = exports.createClient = void 0;
const clientService_1 = __importDefault(require("../services/clientService"));
const createClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = req.body;
        const newClient = yield clientService_1.default.createClient(client);
        res.status(201).json(newClient);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createClient = createClient;
const getClients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10, name } = req.query;
        const { clients, total } = yield clientService_1.default.getClients({ name: name }, Number(page), Number(limit));
        res.status(200).json({ clients, total });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getClients = getClients;
const updateClient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const client = req.body;
        const updatedClient = yield clientService_1.default.updateClient(Number(id), client);
        if (!updatedClient) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        res.status(200).json(updatedClient);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.updateClient = updateClient;
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield clientService_1.default.deleteClient(Number(id));
        if (!deleted) {
            res.status(404).json({ error: 'Client not found' });
            return;
        }
        res.status(200).json({ message: 'Client deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteClient = deleteClient;
