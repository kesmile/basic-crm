import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with TypeScript and Swagger',
      version: '1.0.0',
      description: 'A simple CRUD API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia el puerto si es necesario
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Ruta a los archivos donde definirás tus endpoints
};

export default swaggerOptions;