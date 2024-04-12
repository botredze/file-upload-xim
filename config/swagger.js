const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Xim file uploader',
      version: '1.0.0',
      description: 'Express /file /auth API ',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);


module.exports = { specs, swaggerUi };
