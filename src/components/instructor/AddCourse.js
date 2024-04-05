import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from '../../redux/addCourseSlice';
import { toggleShowAddCourseForm } from '../../redux/UiInteractionSlice';

const AddCourse = () => {
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);
    const thumbnailRef = useRef(null);
    const [showCourseId , setShowCourseID] = useState(false);
    const dispatch = useDispatch();
    let CourseId = '';
    

    const handleAddCourse = async(e) => {
        e.preventDefault();
        const courseInfo = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            link: thumbnailRef.current.value,
        };
        const response = await fetch('https://academix.runasp.net/api/Courses/CreateCourse',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseInfo),
        });
        const data = await response.json();
        console.log(data);
        CourseId = data.id;
        console.log(CourseId);
        nameRef.current.value = '';
        descriptionRef.current.value = '';
        thumbnailRef.current.value = '';
        setShowCourseID(true)
    };

    return (
        <div className='flex justify-center items-center h-full'>
            <div className='max-w-lg w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 relative'>
                <button className="absolute -top-2 right-0 m-2 text-gray-500 text-3xl" onClick={()=>{dispatch(toggleShowAddCourseForm())}}>X</button>
                <h1 className='text-2xl font-bold mb-6 text-center'>Create Course</h1>
               {!showCourseId && <form>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='courseName'>Course Name</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='courseName'
                            type='text'
                            placeholder='Enter course name'
                            ref={nameRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='courseDescription'>Course Description</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='courseDescription'
                            type='text'
                            placeholder='Enter course description'
                            ref={descriptionRef}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='courseThumbnail'>Course Thumbnail</label>
                        <input
                            ref={thumbnailRef}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='courseThumbnail'
                            type='text'
                            placeholder='Enter course thumbnail URL'
                        />
                    </div>
                    <div className='flex justify-center'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4'
                            type='submit'
                            onClick={handleAddCourse}
                        >
                            Submit
                        </button>
                    </div>
                </form>}
                {showCourseId&&<h1 className='text-center absolute top-[50%] left-[50%]'>{CourseId}</h1>}
            </div>
        </div>
    );
};

export default AddCourse;
