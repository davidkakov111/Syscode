const { v4: uuidv4 } = require('uuid');

// Generate random address
const generateRandomAddress = () => {
  const addresses = [
    "1234 Elm Street",
    "5678 Oak Avenue",
    "9101 Pine Boulevard",
    "2345 Maple Road",
    "6789 Cedar Lane"
  ];
  
  const randomAddress = addresses[Math.floor(Math.random() * addresses.length)];
  return randomAddress;
};

// Address modell
class Address {
  constructor() {
    this.id = uuidv4(); 
    this.address = generateRandomAddress();
  }
}

module.exports = Address;
