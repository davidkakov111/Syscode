const request = require('supertest');
const { app, server } = require('../app');
const Student = require('../models/Student');
const sequelize = require('../config/database');

beforeAll(async () => {
  // Sync the database before running the tests
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close the database connection after tests
  await sequelize.close();
  server.close();
});

// Integration tests for the routes
describe('Student APIs', () => {
    it('should list all students', async () => {
        const response = await request(app).get('/read');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create a student', async () => {
        const response = await request(app).post('/create').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'John Doe');
        expect(response.body).toHaveProperty('email', 'johndoe@example.com');
    });

    it('should update a student', async () => {
        // First, create a student
        const student = await Student.create({
            name: 'Jane Doe',
            email: 'janedoe@example.com',
        });

        // Now, update the student's name
        const response = await request(app)
        .put(`/update/${student.id}`)
        .send({
            name: 'Jane Smith',
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Jane Smith');
    });

    it('should delete a student', async () => {
        // First, create a student
        const student = await Student.create({
            name: 'Jack Doe',
            email: 'jackdoe@example.com',
        });

        // Now, delete the student
        const response = await request(app).delete(`/delete/${student.id}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Student deleted successfully');
    });

    it('should return 404 if student not found during update', async () => {
        const response = await request(app).put('/update/1255e52c-9dab-4791-b8b7-35b3ea8ab69e').send({
            name: 'Nonexistent Student',
        });
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Student not found');
    });

    it('should return 404 if student not found during delete', async () => {
        const response = await request(app).delete('/delete/1255e52c-9dab-4791-b8b7-35b3ea8ab69e');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Student not found');
    });

    it('should return validation error if email is invalid', async () => {
        const response = await request(app).post('/create').send({
            name: 'Invalid Student',
            email: 'invalid-email',
        });
        expect(response.status).toBe(400);
        expect(response.body.error).toMatch(/Validation error/);
    });
});
