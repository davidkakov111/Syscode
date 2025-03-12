const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const { getAddress } = require('./controllers/AddressController');

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

app.get('/', (req, res) => {
  res.send('Address Service');
});

// Endpoint to return random address
app.get('/address', getAddress);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Address server running on port ${PORT}`);
});

// Export app for testing
module.exports = app;