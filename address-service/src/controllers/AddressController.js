const Address = require('../models/Address');
const sequelize = require('../config/database');

// Return random address
const getAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      order: sequelize.random()
    });
    
    if (!address) return res.status(404).json({ error: 'No address found' });
    return res.status(200).json(address);
  } catch (error) {
    console.error('Error fetching address:', error);
    return res.status(500).json({ error: 'Failed to fetch address' });
  }
};

module.exports = { getAddress };
