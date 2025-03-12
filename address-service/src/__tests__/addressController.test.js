const { getAddress } = require('../controllers/AddressController');
const Address = require('../models/Address');
const { v4: uuidv4 } = require('uuid');

// Mocking the Address model
jest.mock('../models/Address');

describe('AddressController', () => {
    // Test address controller
    it('should return a generated address with UUID', () => {
        const mockAddress = {
            id: uuidv4(),
            address: "1234 Elm Street"
        };
        Address.mockImplementation(() => {
            return mockAddress;
        });

        const req = {};
        const res = {
            json: jest.fn()
        };

        getAddress(req, res);

        expect(res.json).toHaveBeenCalledWith(mockAddress);
        expect(res.json).toHaveBeenCalledTimes(1);
    });
});
