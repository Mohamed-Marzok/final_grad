import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const ExamCard = ({exam}) => {
    const {tittle,grades,date,id} = exam;
    const navigate = useNavigate();
    console.log(id); 
  return (
    <div className='w-80 h-40 shadow-md rounded-md'>
      <div className='p-2 m-2'>
        <h1>{tittle}</h1>
        <h2>pionts: {grades}</h2>
      </div>
      <div className=''>
        
        <button className='bg-[#18A9EA] rounded-md p-2 m-2'
        onClick={()=>{
            navigate('/quiz',{state:{id: id}});
        }}>View Exam</button>
        
      </div>
    </div>
  )
}

export default ExamCard
