import { Router } from 'express';
import {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from '../controllers/meetingController';

const router = Router();
/**
 * @swagger
 * /api/meetings/:
 *   post:
 *     summary: Create a new meeting
 *     tags: [Meetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Project Kickoff
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-10-01
 *               time:
 *                 type: string
 *                 format: time
 *                 example: 14:00
 *               notes:
 *                 type: string
 *                 example: Initial meeting to discuss project kickoff
 *     responses:
 *       201:
 *         description: Meeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 project_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Project Kickoff
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2023-10-01
 *                 time:
 *                   type: string
 *                   format: time
 *                   example: 14:00
 *                 notes:
 *                   type: string
 *                   example: Initial meeting to discuss project kickoff
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *       400:
 *         description: Bad request
 */
router.post('/', createMeeting);

/**
 * @swagger
 * /api/meetings/:
 *   get:
 *     summary: Retrieve a list of meetings
 *     tags: [Meetings]
 *     parameters:
 *       - in: query
 *         name: projectId
 *         schema:
 *           type: integer
 *         description: Filter meetings by project ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter meetings by title
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
 *         description: A list of meetings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meetings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       project_id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Project Kickoff
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: 2023-10-01
 *                       time:
 *                         type: string
 *                         format: time
 *                         example: 14:00
 *                       notes:
 *                         type: string
 *                         example: Initial meeting to discuss project kickoff
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-10-01T14:00:00Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-10-01T14:00:00Z
 *                 total:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Bad request
 */

router.get('/', getMeetings);
/**
 * @swagger
 * /api/meetings/{id}:
 *   get:
 *     summary: Retrieve a meeting by ID
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: A meeting object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 project_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Project Kickoff
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2023-10-01
 *                 time:
 *                   type: string
 *                   format: time
 *                   example: 14:00
 *                 notes:
 *                   type: string
 *                   example: Initial meeting to discuss project kickoff
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *       400:
 *         description: Bad request
 *       404:
 *         description: Meeting not found
 */
router.get('/:id', getMeetingById);
/**
 * @swagger
 * /api/meetings/{id}:
 *   put:
 *     summary: Update an existing meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The meeting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project_id:
 *                 type: integer
 *                 example: 1
 *               title:
 *                 type: string
 *                 example: Updated Meeting Title
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2023-10-01
 *               time:
 *                 type: string
 *                 format: time
 *                 example: 14:00
 *               notes:
 *                 type: string
 *                 example: Updated notes for the meeting
 *     responses:
 *       200:
 *         description: Meeting updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 project_id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: Updated Meeting Title
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: 2023-10-01
 *                 time:
 *                   type: string
 *                   format: time
 *                   example: 14:00
 *                 notes:
 *                   type: string
 *                   example: Updated notes for the meeting
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: 2023-10-01T14:00:00Z
 *       400:
 *         description: Bad request
 *       404:
 *         description: Meeting not found
 */
router.put('/:id', updateMeeting);

/**
 * @swagger
 * /api/meetings/{id}:
 *   delete:
 *     summary: Delete a meeting
 *     tags: [Meetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The meeting ID
 *     responses:
 *       200:
 *         description: Meeting deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Meeting not found
 */
router.delete('/:id', deleteMeeting);

export default router;