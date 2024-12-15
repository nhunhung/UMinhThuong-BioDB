// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Định nghĩa cấu hình cho Swagger
const options = {
  definition: {
    openapi: '3.0.0',  // Sử dụng OpenAPI 3.0
    info: {
      title: 'My API',  // Tên API của bạn
      version: '1.0.0',  // Phiên bản của API
      description: 'CÁC API TRONG PROJECT UMINHTHUONG-BIODB', // Mô tả API
    },
  },
  apis: ['./src/routes/*.js'],  // Đường dẫn tới các file chứa API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };
