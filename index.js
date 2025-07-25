import express from 'express';
import router from './routes/routes.js';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swagger from './config/swagger.js';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// Routes
app.use('/tasks', router);

app.listen(PORT, () => {
  console.log(`Server running st http://localhost:${PORT}`);
})
