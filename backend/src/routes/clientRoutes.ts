import { Router } from 'express';
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
  getClientById,
} from '../controllers/clientController';

const router = Router();

/**
 * @swagger
 * /api/clients/:
 *   get:
 *     summary: Retrieve a list of clients
 *     tags: [Clients]
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
 *         description: Filter clients by name
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   phone:
 *                     type: string
 *                     example: 123-456-7890
 *                   address:
 *                     type: string
 *                     example: 123 Main St, Anytown, USA
 *       400:
 *         description: Bad request
 *       401:
 *         description: Access denied, token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied, token missing
 */
router.post('/', createClient);
/**
 * @swagger
 * /api/clients/:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Client created successfully
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
 *       401:
 *         description: Access denied, token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied, token missing
 */
router.get('/', getClients);
/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
 *     responses:
 *       200:
 *         description: A client object
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
 *       404:
 *         description: Client not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getClientById);

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Update an existing client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client updated successfully
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
 *       401:
 *         description: Access denied, token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied, token missing
 *       404:
 *         description: Client not found
 */
router.put('/:id', updateClient);
/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The client ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Access denied, token missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Access denied, token missing
 *       404:
 *         description: Client not found
 */
router.delete('/:id', deleteClient);

export default router;
