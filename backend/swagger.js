const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API del Sistema de Gestión",
      version: "1.0.0",
      description:
        "Documentación de la API de tu sistema (Empresas, Usuarios, Roles, etc.)",
    },
    servers: [
      {
        url: "http://localhost:3000/api", 
        description: "Servidor local",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // ← Aquí Swagger leerá todos tus archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
