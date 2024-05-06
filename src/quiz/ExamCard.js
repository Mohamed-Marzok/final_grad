import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ExamCard = ({exam}) => {
    const {tittle,grades,date,Id} = exam;
    console.log(exam);
    const navigate = useNavigate();
    console.log(Id); 
    // const { id: courseId, examId } = useParams(); 
  return (
    <div className='w-80 h-40 shadow-md rounded-md'>
      <div className='p-2 m-2'>
        <h1>{tittle}</h1>
        <h2>pionts: {grades}</h2>
      </div>
      <div className=''>
        
      <Link to={`/quiz/${Id}`}>
        <button className='bg-[#18A9EA] rounded-md p-2 m-2'>
          View Exam
        </button>
      </Link>


        
      </div>
    </div>
  )
}

export default ExamCard
