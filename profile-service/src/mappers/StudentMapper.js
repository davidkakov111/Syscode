const Student = require('../models/Student');
const StudentDTO = require('./StudentDTO');

const toEntity = (studentDTO) => {
  const student = new Student();
  student.name = studentDTO.name;
  student.email = studentDTO.email;
  return student;
};

const toDTO = (student) => {
  return new StudentDTO(student.name, student.email);
};

module.exports = { toEntity, toDTO };