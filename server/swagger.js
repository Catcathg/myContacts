const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Contacts",
      version: "1.0.0",
      description: "Documentation de l’API en Swagger (OpenAPI).",
    },
    components: {
      securitySchemes: {
        bearerAuth: {          
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./swagger/*.js"],
};


const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
