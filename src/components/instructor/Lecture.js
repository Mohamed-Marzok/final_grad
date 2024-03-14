import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar';
import Header from '../Header';
import LectureCard from './LectureCard';
import Footer from '../Footer';
const Lecture = () => {

    const lectures = useSelector(store => store.addLecture);
  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <div className='flex flex-1 justify-center items-center'>
        <Sidebar />
        <div className='w-3/4 h-screen m-auto relative overflow-y-auto'>
            {(
                <div className='flex h-full p-6'>
                   <div className='flex justify-center items-start flex-wrap'>
                   {lectures.map((lecture, index) => (
                        <LectureCard key={index} lecture={lecture} />
                    ))}
                   </div>
                </div>
            )}
        </div>
    </div>
    {/* <div className='absolute bottom-4 right-16'>
        <button
            className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
            onClick={() => dispatch(toggleShowAddCourseForm())} 
        >
            {isCourseFormOpen ? 'Close' : '➕'} 
        </button>
    </div> */}
    <Footer />
</div>
  )
}

export default Lecture
