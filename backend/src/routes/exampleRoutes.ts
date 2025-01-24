import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: Get an example message
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/example', (req, res) => {
  res.json({ message: 'Hello, Swagger!' });
});

export default router;
