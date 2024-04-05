import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LectureCard from './LectureCard';
import AddLecture from './AddLecture';
import { toggleShowAddLectureForm, toggleShowAddPostForm } from '../../redux/UiInteractionSlice';
import PostForm from '../post/PostForm';
import { useParams } from 'react-router';
import FetchData from '../../hooks/fetchData';

const CoursePage = () => {
    const [showAddExamForm, setShowAddExamForm] = useState(false);
    const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
    const showAddLectureForm = useSelector(store => store.UiInteraction.showAddLectureForm);
    const showAddPostForm = useSelector(store => store.UiInteraction.showAddPostForm);
    const dispatch = useDispatch();
    const { id } = useParams();
    const courseData = FetchData('https://academix.runasp.net/api/Courses?id=', id);
    const lectures = FetchData('https://academix.runasp.net/api/Lectures/GetCourseLectures', id);
    const assignments = FetchData('https://academix.runasp.net/api/Asignments/GetCourseAssignments', id);
    console.log(lectures, 'ii');
    console.log(courseData);
    if (!courseData) return null;

    return (
        <div>
            {!showAddAssignmentForm && !showAddLectureForm&& !showAddPostForm && (
                <div className='w-3/4 h-screen m-auto relative overflow-y-auto'>
                    <div className='flex flex-col justify-center items-center m-4 p-2'>
                        <h1 className='font-bold'>{courseData.courseName}</h1>
                        <p>{courseData.description}</p>
                    </div>
                    <div className='flex justify-center items-center'>
                        {lectures &&
                            lectures.map((lecture) => (
                                <LectureCard key={lecture.id} lecture={lecture} />
                            ))}
                        {assignments &&
                            assignments.map((assignment) => (
                                <LectureCard key={assignment.id} lecture={assignment} />
                            ))}
                    </div>
                </div>
            )}
            <div className='absolute bottom-4 right-16'>
                <div className='flex justify-center items-center gap-2'>
                    <button
                        className='bg-[#18A9EA] hover:bg-[#4b9cc2] text-white font-bold py-2 px-4 rounded-full'
                        onClick={() => setShowAddExamForm(!showAddExamForm)}
                    >
                        {showAddExamForm ? 'Close' : '+ Exam'}
                    </button>
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
            </div>
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
        </div>
    );
};

export default CoursePage;
