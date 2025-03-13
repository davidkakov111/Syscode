const request = require('supertest');
const { app, server } = require('../app');
const sequelize = require('../config/database');

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
  server.close();
});

// Integration tests for the route
describe('GET /address', () => {
  it('should return a random address with UUID', async () => {
    const response = await request(app).get('/address');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('address');
    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.address).toBe('string');
  });
});
