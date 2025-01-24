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
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const clientRepository_1 = __importDefault(require("../repositories/clientRepository"));
class ClientService {
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClient = yield clientRepository_1.default.create(client);
            redisClient_1.default.del('clients'); // Invalidate cache
            return newClient;
        });
    }
    getClients(filter, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check cache
            // const cachedClients = await redisClient.get('clients');
            // if (cachedClients) {
            //   return JSON.parse(cachedClients);
            // }
            // Fetch from DB
            const clients = yield clientRepository_1.default.findAll(filter, page, limit);
            // Cache the result
            redisClient_1.default.set('clients', JSON.stringify(clients), { EX: 300 }); // Cache for 5 minutes
            return clients;
        });
    }
    updateClient(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedClient = yield clientRepository_1.default.update(id, client);
            if (updatedClient)
                redisClient_1.default.del('clients'); // Invalidate cache
            return updatedClient;
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield clientRepository_1.default.delete(id);
            if (deleted)
                redisClient_1.default.del('clients'); // Invalidate cache
            return deleted;
        });
    }
}
exports.default = new ClientService();
