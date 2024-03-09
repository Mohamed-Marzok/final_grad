import React from 'react'
import { useSelector } from 'react-redux'

const Sidebar = () => {

  const isSidebarOpen = useSelector(store => store.UiInteraction.isSidebarOpen);
  return(isSidebarOpen? (
    <div className=' h-screen border-r-2 mr-8'>
       <ul className='m-2 p-2'>
       <li className='p-2 m-4 hover:bg-[#f2f2f2] rounded-md flex flex-col items-center'>
            <div className="text-2xl mb-2">🧑‍🎓</div>
            <div className="text-sm">Courses</div>
      </li> 
        <li className='p-2 m-4 flex flex-col items-center hover:bg-[#f2f2f2] rounded-md'>
          <div className='text-2xl mb-2'>📄</div>
          <div className="text-sm">Exams</div>
        </li>
        <li className='p-2 m-4 flex flex-col items-center hover:bg-[#f2f2f2] rounded-md'>
          <div className='text-2xl mb-2'>📜</div>
          <div className="text-sm">Assignments</div>
        </li>     
        
        </ul>
    </div>
  ) :  (
    <div className='w-72 h-screen overflow-y-auto border-r-2 p-2 mr-8'>
      <ul className='m-2 p-2'>
        <li className='p-2 m-2 h-10 hover:bg-[#f2f2f2] rounded-md'>🧑‍🎓 Courses</li>
        <li className='p-2 m-2 h-10 hover:bg-[#f2f2f2] rounded-md'>📄 Exams</li>
        <li className='p-2 m-2 h-10 hover:bg-[#f2f2f2] rounded-md'>📜 Assignments</li>
      </ul>
     
      
    </div>
  ))
}

export default Sidebar
