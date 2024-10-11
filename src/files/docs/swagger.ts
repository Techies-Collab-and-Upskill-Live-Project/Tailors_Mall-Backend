import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerOptions } from 'swagger-ui-express';


const swaggerOptions: SwaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', //  the OpenAPI version
        info: {
            title: 'Tailors Mall API', // Title of the API
            version: '1.0.0', // Version of the API
            description: 'API documentation for Tailors Mall version 1', // Description of the API
        },
        servers: [
            {
                url: 'http://localhost:5500/api/v1', // Base URL for the API
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Format of the token
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/files/**/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerDocs, swaggerUi };

