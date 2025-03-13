const { getAddress } = require('../controllers/AddressController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const Address = require('../models/Address');

// Mocking the Address model
jest.mock('../models/Address');

describe('Address Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test address controller
    it('should return a random address with UUID', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const address = { id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e', address: '1234 Elm Street' };
        Address.findOne.mockResolvedValue(address);
    
        await getAddress(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(address);
    });

    // Test for error handling when no address is found
    it('should return 404 if no address found', async () => {
        const req = mockRequest();
        const res = mockResponse();

        Address.findOne.mockResolvedValue(null);

        await getAddress(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No address found' });
    });
});
