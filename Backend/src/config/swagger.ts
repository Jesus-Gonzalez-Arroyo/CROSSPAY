import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CrossPay API',
    version: '1.0.0',
    description: 'Documentación de la API de transacciones y autenticación',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor local'
    },
    {
      url: 'https://crosspay.onrender.com/api',
      description: 'Servidor de producción'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    }
  },
  security: [
    { bearerAuth: [] }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
