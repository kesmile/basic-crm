import redisClient from '../utils/redisClient';
import ClientRepository from '../repositories/clientRepository';
import { Client } from '../models/clientModel';

class ClientService {
  async createClient(client: Client): Promise<Client> {
    const newClient = await ClientRepository.create(client);
    redisClient.del('clients'); // Invalidate cache
    return newClient;
  }

  async getClients(filter: { name?: string }, page: number, limit: number): Promise<{ clients: Client[], total: number }> {
    // Check cache
    // const cachedClients = await redisClient.get('clients');
    // if (cachedClients) {
    //   return JSON.parse(cachedClients);
    // }

    // Fetch from DB
    const clients = await ClientRepository.findAll(filter, page, limit);

    // Cache the result
    redisClient.set('clients', JSON.stringify(clients), { EX: 300 }); // Cache for 5 minutes
    return clients;
  }

  async updateClient(id: number, client: Partial<Client>): Promise<Client | null> {
    const updatedClient = await ClientRepository.update(id, client);
    if (updatedClient) redisClient.del('clients'); // Invalidate cache
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    const deleted = await ClientRepository.delete(id);
    if (deleted) redisClient.del('clients'); // Invalidate cache
    return deleted;
  }
}

export default new ClientService();