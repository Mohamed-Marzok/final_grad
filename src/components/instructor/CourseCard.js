import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    console.log(course,'df');
    if(!course.Course) return null;
    console.log(course?.Course, 'courseinfo');
    const { courseName, Description, File,Id } = course?.Course;
    const pathName = window.location.pathname;
    const segments = pathName.split('/');
    const user = segments.includes('student')? 'student' : 'instructor';

    return (
        <div className='w-72  h-auto rounded-xl overflow-hidden shadow-md m-4 bg-white hover:shadow-lg cursor-pointer'>
            <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
                <div className="relative h-56 overflow-hidden bg-blue-gray-500 shadow-lg bg-clip-border rounded-t-xl">
                    <img src={`data:image/png;base64,${File}`} alt="card-image" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                    <h5 className="block mb-2 font-sans text-xl font-semibold leading-snug text-blue-gray-900 text-center">
                        {courseName}
                    </h5>
                    <p className="block font-sans text-base leading-relaxed text-gray-700 text-center">
                        {Description}
                    </p>
                </div>
                <div className="p-6 pt-0 flex justify-center items-center">
                    <Link to={'/'+user+'/coursepage/'+Id}>
                    <button className="font-bold uppercase text-xs py-3 px-6 rounded-lg bg-[#18A9EA] text-white hover:bg-[#4b9cc2]">
                        manage course
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
