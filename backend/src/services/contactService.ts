import ContactRepository from '../repositories/contactRepository';
import { Contact } from '../models/contactModel';

class ContactService {
  async createContact(contact: Contact): Promise<Contact> {
    return ContactRepository.create(contact);
  }

  async getContacts(
    name?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ contacts: Contact[]; total: number }> {
    return ContactRepository.findAll(page, limit, name);
  }

  async getContactById(id: number): Promise<Contact | null> {
    return ContactRepository.findById(id);
  }

  async updateContact(
    id: number,
    updates: Partial<Contact>,
  ): Promise<Contact | null> {
    return ContactRepository.update(id, updates);
  }

  async deleteContact(id: number): Promise<boolean> {
    return ContactRepository.delete(id);
  }
}

export default new ContactService();
