import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Sidebar from './Sidebar';
import Footer from '../Footer';
import AddCourse from './AddCourse';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowAddCourseForm } from '../../redux/UiInteractionSlice';
import CourseCard from './CourseCard';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const isCourseFormOpen = useSelector(store => store.UiInteraction.showAddCourseForm);

    useEffect(()=>{
        console.log('component rendered')
        getUserCourses(localStorage.getItem('userEmail'));
    },[isCourseFormOpen])
    const dispatch = useDispatch();
    const [id, setId] = useState(null);
    const userMail = localStorage.getItem('userEmail');
   
    const enrollCourse = async () => {
        if (!id || !id.trim()) return;
        const addCourse = await fetch(`https://academix.runasp.net/api/Enrollments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userMail,
                courseId: Number(id),
              
            })
        });
        const courseData = await addCourse.json();
        console.log(courseData);
        setCourses([...courses,courseData]);
    };
    
    const getUserCourses = async(userMail)=>{   
        console.log(userMail ,'email') 
        const response = await fetch('https://academix.runasp.net/api/Courses/GetUserCourses', {
            method: 'GET',
            headers: {
              'usermail': userMail,
            }
          })
        const userCourses = await response.json();
        setCourses(userCourses?.user?.userCourses?.$values);
    }
    console.log(courses,'response');

    return (
        <div className='w-3/4 h-screen m-auto relative overflow-y-auto'>
            {!isCourseFormOpen && (
                <div className='flex h-full p-6'>
                    <div className='flex justify-center items-start flex-wrap'>
                        {courses?.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            )}
            {isCourseFormOpen && <AddCourse />}
            <div className='flex absolute bottom-4 -right-10'>
               {localStorage.getItem('role') === 'Instructor' && <button
                    className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                    onClick={() => dispatch(toggleShowAddCourseForm())}
                >
                    {isCourseFormOpen ? 'Close' : '➕'}
                </button>}
                <div className='flex justify-center items-center gap-2'>
                    <input className='border p-2 ml-2' type='text' placeholder='Course ID' onChange={(e) => setId(e.target.value)} />
                    <button className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4' onClick={enrollCourse}>
                        Enroll
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Courses;
