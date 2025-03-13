const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const cors = require("cors");
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('./controllers/studentController');
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
  res.send('Hello, Profile Service!');
});

// Read endpoint (Listázás)
app.get('/read', getAllStudents);

// Create endpoint (Új felvitel)
app.post('/create', createStudent);

// Update endpoint (Módosítás)
app.put('/update/:id', updateStudent);

// Delete endpoint (Törlés)
app.delete('/delete/:id', deleteStudent);

// OpenAPI 3.0 endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Profile server is running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

// Export app for testing
module.exports = app;