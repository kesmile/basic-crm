"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/projects/:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: New Project
 *               description:
 *                 type: string
 *                 example: Project description
 *               clientId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *                   example: New Project
 *                 description:
 *                   type: string
 *                   example: Project description
 *                 clientId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 */
router.post('/', projectController_1.createProject);
/**
 * @swagger
 * /api/projects/:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: integer
 *         description: Filter projects by client ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter projects by name
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
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Project Name
 *                       description:
 *                         type: string
 *                         example: Project description
 *                       clientId:
 *                         type: integer
 *                         example: 1
 *                 total:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Bad request
 */
router.get('/', projectController_1.getProjects);
/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     responses:
 *       200:
 *         description: A project object
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
 *                   example: Project Name
 *                 description:
 *                   type: string
 *                   example: Project description
 *                 clientId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *       404:
 *         description: Project not found
 */
router.get('/:id', projectController_1.getProjectById);
/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update an existing project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Project Name
 *               description:
 *                 type: string
 *                 example: Updated project description
 *               clientId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Project updated successfully
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
 *                   example: Updated Project Name
 *                 description:
 *                   type: string
 *                   example: Updated project description
 *                 clientId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *       404:
 *         description: Project not found
 */
router.put('/:id', projectController_1.updateProject);
/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Project not found
 */
router.delete('/:id', projectController_1.deleteProject);
exports.default = router;
