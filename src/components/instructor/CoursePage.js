import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LectureCard from './LectureCard';
import AddLecture from './AddLecture';
import AddAssignment from '../assignments/AddAssignment'
import { toggleShowAddLectureForm, toggleShowAddPostForm } from '../../redux/UiInteractionSlice';
import PostForm from '../post/PostForm';
import { Outlet, useParams } from 'react-router';
import FetchData from '../../hooks/fetchData';
import { Link } from 'react-router-dom';
import ExamCard from '../../quiz/ExamCard';

const CoursePage = () => {
    const [showAddExamForm, setShowAddExamForm] = useState(false);
    const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
    const showAddLectureForm = useSelector(store => store.UiInteraction.showAddLectureForm);
    const showAddPostForm = useSelector(store => store.UiInteraction.showAddPostForm);
    const pathName = window.location.pathname;
    const segments = pathName.split('/');
    const user = segments.includes('student')? 'student' : 'instructor';
    console.log(user , 'user')
    const dispatch = useDispatch();
    const createQuizSegment = segments.includes('createquiz')? 1:0; 
    const { id } = useParams();
    const courseData = FetchData('https://academix.runasp.net/api/Courses/', id);
    const lectures = FetchData('https://academix.runasp.net/api/Lectures/GetCourseLectures', id);
    const assignments = FetchData('https://academix.runasp.net/api/Asignments/GetCourseAssignments', id);
    const exams = FetchData('https://academix.runasp.net/api/Exams/GetCourseExams/',id);
    console.log(lectures, 'ii');
    console.log(courseData);
    if (!courseData) return null;
    return (
        <div>
           {!createQuizSegment && <div>
            {!showAddAssignmentForm && !showAddLectureForm&& !showAddPostForm && (
                <div className='w-3/4 h-screen m-auto relative overflow-y-auto'>
                    <div className='flex flex-col justify-center items-center m-4 p-2'>
                        <h1 className='font-bold'>{courseData.courseName}</h1>
                        <p>{courseData.description}</p>
                        <p>Enrollment Code: {courseData.id}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        {lectures &&
                            lectures.$values.map((lecture) => (
                                <LectureCard key={lecture.id} lecture={lecture} />
                            ))}
                        {assignments &&
                            assignments.$values.map((assignment) => (
                                <LectureCard key={assignment.id} lecture={assignment} />
                            ))}
                    </div>
                    <div className='flex justify-start items-start flex-wrap'>
                        {
                            exams && exams.$values.map(exam=>(
                                <ExamCard exam={exam} />
                            ))
                        }
                    </div>
                </div>
            )}
            {user === 'instructor' && <div className='absolute bottom-4 right-16'>
                <div className='flex justify-center items-center gap-2'>
                   <Link to={`/instructor/coursepage/${id}/createquiz`}>
                   <button
                        className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                    >
                        +Exam
                    </button>
                   </Link>
                    <button
                        className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                        onClick={() => dispatch(toggleShowAddLectureForm())}
                    >
                        {showAddLectureForm ? 'Close' : '+ Lecture'}
                    </button>
                    <button
                        className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                        onClick={() => setShowAddAssignmentForm(!showAddAssignmentForm)}
                    >
                        {showAddAssignmentForm ? 'Close' : '+ Assignment'}
                    </button>
                    <button
                        className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                        onClick={() => dispatch(toggleShowAddPostForm())}
                    >
                        {showAddPostForm ? 'Close' : '+ Post'}
                    </button>
                </div>
            </div>}
            {showAddLectureForm && (
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <AddLecture id={id} />
                </div>
            )}
            {showAddPostForm && (
                <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <PostForm id={id} />
                </div>
            )}
            {
                showAddAssignmentForm && (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <AddAssignment id={id} />
                </div>
                )
            }
        </div>}
        <div>
            { <Outlet />}
        </div>
        </div>
    );
};

export default CoursePage;
