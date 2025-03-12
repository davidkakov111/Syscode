const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const Student = require('../models/Student');

jest.mock('../models/Student'); // Mock the entire model

describe('Student Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test getAllStudents controller
    it('should fetch all students', async () => {
        const req = mockRequest();
        const res = mockResponse();

        const students = [{ id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e', name: 'John', email: 'john@example.com' }];
        Student.findAll.mockResolvedValue(students);

        await getAllStudents(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(students);
    });

    // Test createStudent controller
    it('should create a student', async () => {
        const req = mockRequest({
            body: { name: 'John Doe', email: 'johndoe@example.com' },
        });
        const res = mockResponse();

        const newStudent = { id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e', name: 'John Doe', email: 'johndoe@example.com' };
        Student.create.mockResolvedValue(newStudent);

        await createStudent(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(newStudent);
    });

    // Test updateStudent controller
    it('should update a student', async () => {
        const req = mockRequest({
            params: { id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e' },
            body: { name: 'John Smith' },
        });
        const res = mockResponse();
    
        const studentInstance = new Student({ id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e', name: 'John Smith', email: 'johndoe@example.com' });
        
        Student.findByPk = jest.fn().mockResolvedValue(studentInstance);
        studentInstance.save = jest.fn().mockResolvedValue(studentInstance);

        await updateStudent(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(studentInstance);
    });

    // Test deleteStudent controller
    it('should delete a student', async () => {
        const req = mockRequest({ params: { id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e' } });
        const res = mockResponse();

        const student = { id: '1255e52c-9dab-4791-b8b7-35b3ea8ab69e', name: 'John Doe', email: 'johndoe@example.com', destroy: jest.fn() };
        Student.findByPk.mockResolvedValue(student);

        await deleteStudent(req, res);

        expect(student.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Student deleted successfully' });
    });
});
