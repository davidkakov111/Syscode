const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const sequelize = require('./config/database');
const { getAddress } = require('./controllers/AddressController');
const authenticate = require('./middleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, 'openapi.yaml'));

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:4200"
    ]
  })
);

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Database connection error:', err));

app.get('/', (req, res) => {
  res.send('Address Service');
});

// Endpoint to return random address with authentication middleware
app.get('/address', authenticate, getAddress);

// OpenAPI 3.0 endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3001;
const server = app.listen(PORT, () => {
  console.log(`Address server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Export app for testing
module.exports = { app, server };