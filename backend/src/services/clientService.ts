import redisClient from '../utils/redisClient';
import ClientRepository from '../repositories/clientRepository';
import { Client } from '../models/clientModel';

class ClientService {
  async createClient(client: Client): Promise<Client> {
    const newClient = await ClientRepository.create(client);
    redisClient.del('clients');
    return newClient;
  }

  async getClients(
    page: number,
    limit: number,
    name?: string,
  ): Promise<{ clients: Client[]; total: number }> {
    const cachedClients = await redisClient.get('clients');
    if (cachedClients) {
      return JSON.parse(cachedClients);
    }

    const clients = await ClientRepository.findAll(page, limit, name);

    redisClient.set('clients', JSON.stringify(clients), { EX: 300 });
    return clients;
  }

  async updateClient(
    id: number,
    client: Partial<Client>,
  ): Promise<Client | null> {
    const updatedClient = await ClientRepository.update(id, client);
    if (updatedClient) redisClient.del('clients');
    return updatedClient;
  }

  async deleteClient(id: number): Promise<boolean> {
    const deleted = await ClientRepository.delete(id);
    if (deleted) redisClient.del('clients');
    return deleted;
  }
}

export default new ClientService();
