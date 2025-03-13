const Address = require('./models/Address');
const { faker } = require('@faker-js/faker');

// Generate 10 random addresses and insert them into the database if it's empty
const insertDefaultAddresses = async () => {
    try {
        const addressCount = await Address.count();

        if (addressCount === 0) {
            const addresses = [];
            for (let i = 0; i < 10; i++) {
                addresses.push({
                    address: faker.location.streetAddress()
                });
            }

            await Address.bulkCreate(addresses);
            console.log('Default addresses inserted successfully!');
        } else {
            console.log('Addresses already exist, skipping default insertion.');
        }
    } catch (error) {
        console.error('Error inserting default addresses: ', error);
    }
};

insertDefaultAddresses();