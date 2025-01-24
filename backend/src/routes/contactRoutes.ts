import { Router } from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contactController';

const router = Router();
/**
 * @swagger
 * /api/contacts/:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               address:
 *                 type: string
 *                 example: 123 Main St, Anytown, USA
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: 123-456-7890
 *                 address:
 *                   type: string
 *                   example: 123 Main St, Anytown, USA
 *       400:
 *         description: Bad request
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/contacts/:
 *   get:
 *     summary: Retrieve a list of contacts
 *     tags: [Contacts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter contacts by name
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 contacts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: johndoe@example.com
 *                       phone:
 *                         type: string
 *                         example: 123-456-7890
 *                       address:
 *                         type: string
 *                         example: 123 Main St, Anytown, USA
 *                 total:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Bad request
 */
router.get('/', getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Retrieve a contact by ID
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: A contact object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 phone:
 *                   type: string
 *                   example: 123-456-7890
 *                 address:
 *                   type: string
 *                   example: 123 Main St, Anytown, USA
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 */
router.get('/:id', getContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               email:
 *                 type: string
 *                 example: updatedemail@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               address:
 *                 type: string
 *                 example: 123 Updated St, Anytown, USA
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Updated Name
 *                 email:
 *                   type: string
 *                   example: updatedemail@example.com
 *                 phone:
 *                   type: string
 *                   example: 123-456-7890
 *                 address:
 *                   type: string
 *                   example: 123 Updated St, Anytown, USA
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 */
router.put('/:id', updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', deleteContact);

export default router;
