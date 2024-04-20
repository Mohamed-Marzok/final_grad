import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/instructor/Sidebar';
import Footer from '../components/Footer';

const QuestionsPerPage = 5;

const Quiz = ({id}) => {
  console.log('Component rendered');
  
  const [quizData, setQuizData] = useState([]);
  // const [quiz , setQuiz] = useState([]);
  const [questions , setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [showResult, setShowResult] = useState(false);

  useEffect(()=>{
    const fetchQuizDataAndQuestions = async () => {
        try {
          await fetchQuizData();
        } catch (error) {
          console.error('Error fetching quiz data and questions:', error);
        }
      };
  
      fetchQuizDataAndQuestions();
},[])
console.log(quizData,'quiz')
const fetchQuizData = async () => {
    try {
      const response = await fetch(`https://academix.runasp.net/api/Exams/GetExam/65`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      setQuizData(data);
      setQuestions(data.questions.$values)
      console.log('Fetched quiz data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };
  

 
  const handleUserAnswer = (index, value) => {
    if (!showResult) {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[index] = value ;
      setUserAnswers(updatedUserAnswers);
    }
  };

  const handleUserMultipleAnswers = (index, choiceIndex, checked) => {
    if (!showResult) {
      const updatedUserAnswers = [...userAnswers];
      if (!updatedUserAnswers[index]) {
        updatedUserAnswers[index] = [];
      }
      if (checked) {
        updatedUserAnswers[index].push(choiceIndex);
      } else {
        updatedUserAnswers[index] = updatedUserAnswers[index].filter((item) => item !== choiceIndex);
      }
      setUserAnswers(updatedUserAnswers);
    }
  };

  const calculateScore = () => {
    let score = 0;
    console.log(questions , 're')
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = userAnswers[i];
      if (question.type === 'mcq' && (answer-1) === Number(question.correctAnswer)) {
        console.log('mcq');
        score++;
      } 
      else if (question.type === 'multiple answers' && answer &&arraysEqual(answer, question.correctAnswer.split('/').filter(answer => answer.trim() !== "").reverse())) {
        score++;
      }
    }
    return score;
  };

  const arraysEqual = (arr1, arr2) => {
    console.log(arr1 , arr2);
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] - 1 !== Number(arr2[i])) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!showResult && currentPage < Math.ceil((quizData.length - 1) / QuestionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (!showResult && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log(userAnswers , 'user answers');
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };
  const renderQuestions = () => {
    if (!quizData || quizData.length === 0) {
      return <p>loading...</p>; 
    }
    const startIndex = currentPage * QuestionsPerPage + 1;
    const endIndex = Math.min(startIndex + QuestionsPerPage, quizData.length);
    
    console.log(quizData?.$values,'hj')
    return quizData?.questions.$values?.map((question, index) => (
      
      <div key={index} className="question p-4 border-2 my-4 border-gray-200">
        <label className='text-lg font-bold p-2'>Question {index+1}</label>
        <p className="font-bold m-2 text-center">{question.text}</p>
        <div className="choices grid grid-cols-2 gap-4 my-2">
        {question.options.split('/').map((option, optionIndex) => {
  const trimmedOption = option.trim();
  if (trimmedOption) {
    return (
      <div key={optionIndex} className="choice my-2 flex justify-center items-center mb-2">
        {question.type === "mcq" ? (
          <label className="cursor-pointer">
            <input
              type="radio"
              value={optionIndex}
              checked={userAnswers[startIndex + index - 1] === optionIndex}
              onChange={() => handleUserAnswer(startIndex + index - 1, optionIndex)}
              disabled={showResult}
              className="mr-2"
            />
            {trimmedOption}
          </label>
        ) : (
          <label className="cursor-pointer">
            <input
              type="checkbox"
              value={optionIndex}
              checked={userAnswers[startIndex + index - 1] && userAnswers[startIndex + index - 1].includes(optionIndex)}
              onChange={(e) => handleUserMultipleAnswers(startIndex + index - 1, optionIndex, e.target.checked)}
              disabled={showResult}
              className="mr-2"
            />
             {trimmedOption}
          </label>
        )}
      </div>
    );
  }
})}

        </div>
      </div>
    ));
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 justify-center items-center">
        <Sidebar />
        <div className="w-2/4 h-screen m-auto relative overflow-y-auto">
          <div className="quiz mx-auto p-8 bg-white rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Quiz</h2>
            <div className="mb-4 flex justify-between items-center">
            
            <table className="text-[#fa5757] font-bold mb-4 border-2 w-full">
      {quizData && <tbody>
        <tr>
          <td className="w-3/4 border-r-2">
            <table>
              <tbody>
                <tr className=''>
                  <td className=" pr-4">Name: {quizData.tittle}</td>
                </tr>
                <tr className=''>
                  <td className=" pr-4">Description: {quizData.describtion}</td>
                </tr>
                <tr className=''>
                  <td className=" pr-4">Instruction: {quizData.instructions}</td>
                </tr>
                <div className='w-full'></div>
                <tr className=''>
                  <td className=" pr-4">Total Questions: {questions.length }</td>
                </tr>
                
                <tr>
                  <td className=" pr-4">Total Points:{quizData.grades}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <td className="w-1/4">
            <h2 className='text-center'>Time</h2>
          </td>
        </tr>
      </tbody> }
    </table>
            </div>
            <form onSubmit={handleSubmit}>
              {renderQuestions()}
              <div className="flex justify-between mt-4">
                <button type="button" onClick={handlePrev} disabled={currentPage === 0 || showResult} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md focus:outline-none">
                  Previous
                </button>
                <button type="button" onClick={handleNext} disabled={currentPage === Math.ceil((quizData.length - 1) / QuestionsPerPage) - 1 || showResult} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md focus:outline-none">
                  Next
                </button>
                {(
                  <button type="submit" className="bg-[#fa5757] text-white px-4 py-2 rounded-md hover:bg-[#eb5252] focus:outline-none">
                    Submit Quiz
                  </button>
                )}
              </div>
            </form>
            { (
              <div className="result mt-4">
                { showResult && <h3>Your Score: { `${calculateScore()} / ${quizData.grades}`}</h3>}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;