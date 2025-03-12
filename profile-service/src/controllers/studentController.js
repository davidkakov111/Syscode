const Student = require('../models/Student');

// Read (Listazas)
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    return res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Create (Új felvitel)
const createStudent = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
  
  try {
    const newStudent = await Student.create({ name, email });
    return res.status(200).json(newStudent);
  } catch (error) {
    // In case of invalid email
    if (error.name === 'SequelizeValidationError') {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${errorMessage}` });
    }

    console.error('Error creating student:', error);
    return res.status(500).json({ error: 'Failed to create student' });
  }
};

// Update (Módosítás)
const updateStudent = async (req, res) => {
  const { id } = req.params; // UUID from the route parameters
  const { name, email } = req.body;

  if (!id || (!name && !email)) return res.status(400).json({ error: 'At least the id and one of name or email is required' });

  try {
    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ error: 'Student not found' });
    
    // Update the student's information
    if (name) student.name = name;
    if (email) student.email = email;
    await student.save();

    return res.status(200).json(student); 
  } catch (error) {
    // In case of invalid email
    if (error.name === 'SequelizeValidationError') {
      const errorMessage = error.errors.map((err) => err.message).join(', ');
      return res.status(400).json({ error: `Validation error: ${errorMessage}` });
    }
    
    console.error('Error updating student:', error);
    return res.status(500).json({ error: 'Failed to update student' });
  }
};

// Delete (Törlés)
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id); // Find the student by UUID
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.destroy();
    return res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    return res.status(500).json({ error: 'Failed to delete student' });
  }
};

module.exports = {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
