import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar';
import Header from '../Header';
import LectureCard from './LectureCard';
import Footer from '../Footer';
const Lecture = () => {

    const lectures = useSelector(store => store.addLecture);
  return (
    
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
  )
}

export default Lecture
