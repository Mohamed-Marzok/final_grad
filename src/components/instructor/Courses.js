import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import AddCourse from './AddCourse';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowAddCourseForm } from '../../redux/UiInteractionSlice';
import CourseCard from './CourseCard';

const Courses = () => {
    const isCourseFormOpen = useSelector(store => store.UiInteraction.showAddCourseForm)
    const courses = useSelector(store => store.addCourse);
    console.log(courses , "kl")
    const dispatch = useDispatch();
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex flex-1 justify-center items-center'>
                <Sidebar />
                <div className='w-3/4 h-screen m-auto relative overflow-y-auto'>
                    {!isCourseFormOpen && (
                        <div className='flex h-full p-6'>
                           <div className='flex justify-center items-start flex-wrap'>
                           {courses.map((course, index) => (
                                <CourseCard key={index} course={course} />
                            ))}
                           </div>
                        </div>
                    )}
                    {isCourseFormOpen && <AddCourse />}
                </div>
            </div>
            <div className='absolute bottom-4 right-16'>
                <button
                    className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                    onClick={() => dispatch(toggleShowAddCourseForm())} 
                >
                    {isCourseFormOpen ? 'Close' : '➕'} 
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
