import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerOptions';
import cors from 'cors';
import clientRoutes from './routes/clientRoutes';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/projectRoutes';
import authMiddleware from './middleware/authMiddleware';
import meetingRoutes from './routes/meetingRoutes';
import contactRoutes from './routes/contactRoutes';
import meetingContactRoutes from './routes/meetingContactRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/meetings', authMiddleware, meetingRoutes);
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/meeting-contacts', authMiddleware, meetingContactRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
}

export { app };
