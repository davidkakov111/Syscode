const Address = require('../models/Address');

// Return random address
const getAddress = (req, res) => {
  const address = new Address();
  res.json(address); 
};

module.exports = { getAddress };
