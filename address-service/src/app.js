const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const sequelize = require('./config/database');
const { getAddress } = require('./controllers/AddressController');
const authenticate = require('./middleware');

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Address server running on port ${PORT}`);
});

// Export app for testing
module.exports = app;