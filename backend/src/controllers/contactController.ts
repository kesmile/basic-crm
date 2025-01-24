import { NextFunction, Request, RequestHandler, Response } from 'express';
import ContactService from '../services/contactService';

export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await ContactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getContacts = async (req: Request, res: Response) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const result = await ContactService.getContacts(
      name as string,
      Number(page),
      Number(limit),
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const contact = await ContactService.getContactById(Number(id));
    if (!contact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedContact = await ContactService.updateContact(
      Number(id),
      updates,
    );
    if (!updatedContact) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const deleteContact: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await ContactService.deleteContact(Number(id));
    if (!deleted) {
      res.status(404).json({ error: 'Contact not found' });
      return;
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
