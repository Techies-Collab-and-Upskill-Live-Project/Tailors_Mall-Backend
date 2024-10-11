// src/files/docs/swagger.ts
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Tailors Mall API',
            version: '1.0.0',
            description: 'API documentation for the Tailors Mall project',
        },
        servers: [
            {
                url: 'http://localhost:5500/api/v1', // Change this to your base URL if different
            },
        ],
    },
    apis: ['./src/files/**/*routes.ts'], // Adjust this path if needed
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };

