import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Sidebar from '../components/instructor/Sidebar';
import QuizForm from './QuizForm';
import QuestionInput from './QuestionInput';
import NavigationButtons from './NavigationButtons';
import SubmitButton from './SubmitButton';
import Footer from '../components/Footer'; // Import Footer component
import { Link } from 'react-router-dom';
import { createExam_API } from '../utils/constants';

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    // const dispatch = useDispatch();

    const showPaginationButtons = useSelector(store => store.UiInteraction.showPaginationButtons);
    console.log(showPaginationButtons,"bool")
    const handleQuestionChange = (newQuestions) => {
        setQuestions(newQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className='flex flex-col min-h-screen'>
            
            <form onSubmit={handleSubmit}> {/* Form element */}
                <div className='flex flex-1 justify-center items-center'>
                    
                    <div className='w-2/4 h-screen  m-auto relative overflow-y-auto flex justify-center items-center'>
                        <div className="create-quiz m-auto w-3/4 p-8 bg-white border-2 rounded-md">
                            <h2 className="text-2xl text-center font-semibold mb-4">Create Exam</h2>
                            <QuizForm setQuestions={setQuestions} />
                            {questions.map((question, index) => (
                                index >= currentPage * 5 && index < (currentPage + 1) * 5 && (
                                    <QuestionInput
                                        key={index}
                                        question={question}
                                        onChange={(newQuestion) => handleQuestionChange([...questions.slice(0, index), newQuestion, ...questions.slice(index + 1)])}
                                    />
                                )
                            ))}
                            {showPaginationButtons && <NavigationButtons
                                currentPage={currentPage}
                                totalPages={Math.ceil(questions.length / 5)}
                                setCurrentPage={setCurrentPage}
                            />}
                            <SubmitButton /> {/* Moved SubmitButton inside the form */}
                        </div>
                    </div>
                </div>
            </form>
          
        </div>
    );
};

export default CreateQuiz;
