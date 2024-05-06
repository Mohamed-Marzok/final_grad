import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    const response = await fetch(`https://academix.runasp.net/api/GradesCenter/GetExaamGrades/${id}`);
    const data = await response.json();
    setStudents(data);
  };

  const handleClick = (studentID) => {
    navigate('/studentModel', { state: { examID: id, studentID: studentID } });
  };

  return (
    <table className="w-[70%] m-auto my-8 divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Student Score</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Exam</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {students.map((student, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap">{student.ApplicationUser.FirstName + ' ' + student.ApplicationUser.LastName}</td>
            <td className="px-6 text-center py-4 whitespace-nowrap">{student.Grade}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button onClick={() => handleClick(student.ApplicationUser.Id)} className="text-indigo-600 hover:text-indigo-900">View Exam</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
