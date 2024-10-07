import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [student, setStudent] = useState({ name: '', rollNumber: '' });
  const [subject, setSubject] = useState({ name: '' });
  const [result, setResult] = useState({ rollNumber: '', subjectName: '', marks: '', maxMarks: '' });
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Fetch all subjects
    axios.get('https://resultmanagementbackend.onrender.com/api/v2/getAllsubjects')
      .then(res => {
        if (res.data.success) {
          setSubjects(res.data.subjects);
        }
      });

    // Fetch all roll numbers
    axios.get('https://resultmanagementbackend.onrender.com/api/v1/getAllRollNumber')
      .then(res => {
        if (res.data.success) {
          setStudents(res.data.rollNumbers);
        }
      });
  }, []);

  const handleStudentChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = e => {
    setSubject({ ...subject, [e.target.name]: e.target.value });
  };

  const handleResultChange = e => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  const handleAddStudent = e => {
    e.preventDefault();
    axios.post('https://resultmanagementbackend.onrender.com/api/v1/create/student', student)
      .then(res => {
        if (res.data.success) {
          setFeedback(res.data.message);
          setStudent({ name: '', rollNumber: '' });
        } else {
          setFeedback(res.data.message);
        }
      })
      .catch(err => setFeedback(err.message));
  };

  const handleAddSubject = e => {
    e.preventDefault();
    axios.post('https://resultmanagementbackend.onrender.com/api/v2/create/subject', subject)
      .then(res => {
        if (res.data.success) {
          setFeedback(res.data.message);
          setSubject({ name: '' });
          setSubjects([...subjects, res.data.data.name]);
        } else {
          setFeedback(res.data.message);
        }
      })
      .catch(err => setFeedback(err.message));
  };

  const handleAddResult = e => {
    e.preventDefault();
    axios.post('https://resultmanagementbackend.onrender.com/api/v3/create/marks', result)
      .then(res => {
        if (res.data.success) {
          setFeedback(res.data.message);
          setResult({ rollNumber: '', subjectName: '', marks: '', maxMarks: '' });
        } else {
          setFeedback(res.data.message);
        }
      })
      .catch(err => setFeedback(err.message));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <p className="text-green-500 mb-4">{feedback}</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleAddStudent} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Add Student</h3>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleStudentChange}
              placeholder="Student Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="rollNumber"
              value={student.rollNumber}
              onChange={handleStudentChange}
              placeholder="Roll Number"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Student
          </button>
        </form>

        <form onSubmit={handleAddSubject} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Add Subject</h3>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={subject.name}
              onChange={handleSubjectChange}
              placeholder="Subject Name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Subject
          </button>
        </form>
      </div>

      <form onSubmit={handleAddResult} className="bg-gray-100 p-6 rounded-lg shadow-md mt-6 mx-auto max-w-lg">
        <h3 className="text-xl font-semibold mb-2">Add Result</h3>
        <div className="mb-4">
          <select
            name="rollNumber"
            value={result.rollNumber}
            onChange={handleResultChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Roll Number</option>
            {students.map((rollNumber, index) => (
              <option key={index} value={rollNumber}>{rollNumber}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <select
            name="subjectName"
            value={result.subjectName}
            onChange={handleResultChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((subjectName, index) => (
              <option key={index} value={subjectName}>{subjectName}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="marks"
            value={result.marks}
            onChange={handleResultChange}
            placeholder="Marks"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="maxMarks"
            value={result.maxMarks}
            onChange={handleResultChange}
            placeholder="Max Marks"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Result
        </button>
      </form>
    </div>
  );
};

export default Admin;
