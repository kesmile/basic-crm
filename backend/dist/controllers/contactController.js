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
exports.deleteContact = exports.updateContact = exports.getContactById = exports.getContacts = exports.createContact = void 0;
const contactService_1 = __importDefault(require("../services/contactService"));
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield contactService_1.default.createContact(req.body);
        res.status(201).json(contact);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, page = 1, limit = 10 } = req.query;
        const result = yield contactService_1.default.getContacts(name, Number(page), Number(limit));
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getContacts = getContacts;
const getContactById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contact = yield contactService_1.default.getContactById(Number(id));
        if (!contact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.status(200).json(contact);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.getContactById = getContactById;
const updateContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedContact = yield contactService_1.default.updateContact(Number(id), updates);
        if (!updatedContact) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.status(200).json(updatedContact);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        next(err);
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield contactService_1.default.deleteContact(Number(id));
        if (!deleted) {
            res.status(404).json({ error: 'Contact not found' });
            return;
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteContact = deleteContact;
