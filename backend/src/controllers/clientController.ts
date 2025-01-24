import { NextFunction, Request, RequestHandler, Response } from 'express';
import ClientService from '../services/clientService';
import { Client } from '../models/clientModel';

export const createClient = async (req: Request, res: Response) => {
  try {
    const client: Client = req.body;
    const newClient = await ClientService.createClient(client);
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, name } = req.query;
    const { clients, total } = await ClientService.getClients(
      { name: name as string },
      Number(page),
      Number(limit)
    );
    res.status(200).json({ clients, total });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const client = req.body;
    const updatedClient = await ClientService.updateClient(Number(id), client);
    if (!updatedClient){
      res.status(404).json({ error: 'Client not found' });
      return;
    } 
      
    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};



export const deleteClient: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await ClientService.deleteClient(Number(id));
    if (!deleted) {
      res.status(404).json({ error: 'Client not found' });
      return;
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};