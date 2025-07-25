import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'A Simple To-Do App (Task Management App)',
    },
    servers: [
      {
        url: 'http://localhost:3000/tasks',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swagger = swaggerJSDoc(options);
export default swagger;