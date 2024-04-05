import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuiz } from '../redux/quizSlice';
import { togglePaginationButtons } from '../redux/UiInteractionSlice';
import QuestionInput from './QuestionInput';
import NavigationButtons from './NavigationButtons';
import SubmitButton from './SubmitButton';
import { createExam_API } from '../utils/constants';

const QuizForm = () => {
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [totalPoints,setTotalPoints] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [name, setName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [description, setDescription] = useState('');
    
    const dispatch = useDispatch();
    const [Head, setHead] = useState(true);
   
    const handleNumQuestionsChange = (e) => {
        console.log(numberOfQuestions)
        if (!isNaN(numberOfQuestions) && numberOfQuestions >= 0) {
            setQuestions(Array(numberOfQuestions).fill().map(() => ({
                type: 'mcq',
                question: '',
                choices: ['', '', '', ''],
                correctAnswer: '0',
                points: 1,
                explanaition:'none',
                selectedAnswers: [],
                // answer: '',
            })));
        } else {
            setQuestions([]);
        }
        setHead(false);
        dispatch(togglePaginationButtons());
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('hi')
        const quizInfo = {
            tittle: name,
            describtion: description,
            instructions: instructions,
            time: "2 hours",
            grades: 2,
            numOfQuestions: numberOfQuestions,
            endDate: "12/10/2024"
                        
        };
        const response = await fetch(createExam_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quizInfo),
        });
        const examData = await response.json();
        
        const questionData = await fetch('https://academix.runasp.net/api/Questions/1',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions),
        });
        const examQuestions = await questionData.json();
        console.log(examQuestions);
        console.log(questions,'gf');
        setName('');
        setDescription('');
        setInstructions('');
        setTotalPoints(0);
        setNumberOfQuestions(0);
        setQuestions([]);
        setCurrentPage(0);
        console.log(examData , 'formdata');

    };


    return (
        <>
            <div className="create-quiz mx-auto p-8 bg-white rounded-md">
                {Head && 
                <form onSubmit={handleSubmit}>
                    <div className=''>
                        <label className='font-bold'>Name</label>
                        <input 
                        onChange={(e)=>{setName(e.target.value)}}  
                        type='text' 
                        placeholder='Exam Name' 
                        className="mb-4 h-10 w-1/4 p-2 block rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <label className='font-bold'>Descriptione</label>
                    <input 
                        onChange={(e)=>{setDescription(e.target.value)}} 
                        type='text' 
                        placeholder='Exam Description' 
                        className="mb-4 h-16 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <label className='font-bold'>Instructions</label>
                    <input 
                        type='text' 
                        placeholder='Exam Instructions' 
                        className="mb-4 h-16 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                        onChange={(e)=>{setInstructions(e.target.value)}} 
                    />
                    <label className='font-bold'>Date</label>
                    <input 
                        type='text' 
                        placeholder='Date' 
                        className="mb-4 h-16 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <label className='font-bold'>Time</label>
                    <input 
                        type='text' 
                        placeholder='Time' 
                        className="mb-4 h-16 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    </div>
                    <div className='flex justify-between'>

                        <div className='flex'>
                        <div className=''>
                            <label className='block font-bold'>Points</label>
                            <input 
                            type='number' 
                            placeholder='Total Points' 
                            className="mr-2 w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                            onChange={(e)=>{setTotalPoints(parseInt(e.target.value))}}
                        />
                        </div>
                      <div className=''>
                        <label className='block font-bold'>Total Q.</label>
                        <input 
                        type="number" 
                        id="numQuestions" 
                        placeholder='Total Questions' 
                        onChange={(e)=>{setNumberOfQuestions(parseInt(e.target.value))}} 
                        required 
                        className="mr-2 w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                      </div>
                        </div>
                      <button 
                        type="submit" 
                        onClick={handleNumQuestionsChange} 
                        className="bg-[#fa5757] mt-4 text-white px-4 py-2 rounded-md hover:bg-[#ee5151] "
                    >
                        Generate Questions
                    </button>
                    </div>
                    
                </form>}
                <QuestionInput questions={questions} setQuestions={setQuestions} currentPage={currentPage} />
                {numberOfQuestions > 0 && <NavigationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfQuestions={numberOfQuestions} /> }
                <SubmitButton handleSubmit={handleSubmit} questions={questions} />
            </div>
        </>
    );
};

export default QuizForm;
