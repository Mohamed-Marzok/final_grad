import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/instructor/Sidebar';
import Footer from '../components/Footer';
import { useParams } from 'react-router';

const QuestionsPerPage = 5;

const Quiz = () => {
  console.log('Component rendered');
  
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [showResult, setShowResult] = useState(false);
  const [questionssub, setQuestionssub] = useState([]);
  const [score, setScore] = useState(0);

  const { examId } = useParams();
  
  useEffect(() => {
    const fetchQuizDataAndQuestions = async () => {
      try {
        const data = await fetchQuizData(examId);
        setQuizData(data);
        console.log(data , 'quis')
        setQuestions(data?.Questions);
      } catch (error) {
        console.error('Error fetching quiz data and questions:', error);
      }
    };
  
    fetchQuizDataAndQuestions();
  }, [examId]);

  const fetchQuizData = async (id) => {
    const response = await fetch(`https://academix.runasp.net/api/Exams/GetExam/${examId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch quiz data');
    }
    return response.json();
  };
  
  const handleUserAnswer = (index, value,name) => {
    console.log(name , 'name')
    if (!showResult) {
      const updatedUserAnswers = [...userAnswers];
      updatedUserAnswers[index] = value;
      // setQuestionssub([...questionssub,{questionId: questions[index].Id,studentAnswer:updatedUserAnswers[index].toString()}])
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
        updatedUserAnswers[index] = updatedUserAnswers[index].filter(item => item !== choiceIndex);
      }
      // setQuestionssub([...questionssub,{questionId: questions[index].Id,studentAnswer:updatedUserAnswers[index].toString()}])
      setUserAnswers(updatedUserAnswers);
    }
  };

  useEffect(() => {
    if (showResult) {
      setScore(calculateScore());
      sendStudentAnswers();
    }
  }, [showResult]);
    const calculateScore = () => {
    console.log('score');
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = userAnswers[i];
      if (question.Type === 'mcq' && (answer) === +(question.CorrectAnswer[0])) {
        score += (quizData.exam.Grades / questions.length);
        console.log('mcq')
      } 
      else if (question.Type === 'multiple answers' && answer && arraysEqual(answer.sort(), question.CorrectAnswer) ){
        console.log('cultiple');
        score += (quizData.exam.Grades / questions.length);
    } 
    console.log(answer , question.CorrectAnswer )
   
    }
    return score;
  };
  console.log(userAnswers , 'ans')
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i]  !== +arr2[i]) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!showResult && currentPage < Math.ceil(questions.length / QuestionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (!showResult && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedQuestionsSub = questions.map((question, index) => ({
      questionId: question.Id,
      studentAnswer: question?.Type === 'mcq'? userAnswers[index]?.toString() : userAnswers[index]?.join(','),
    }));
    console.log(updatedQuestionsSub);
    setQuestionssub(updatedQuestionsSub);
    console.log();
    setShowResult(true);
    console.log(questions,'kk')
  };

  const sendStudentAnswers = async () => {
    const studentExamModel = {
      email: localStorage.getItem('userEmail'),
      examId: quizData?.exam.Id,
      grade: calculateScore(),
      questionssub: questionssub,
    };

    const response = await fetch('https://academix.runasp.net/api/Submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentExamModel),
    });
    if (!response.ok) {
      console.error('Failed to send student answers');
    }
    const data = await response.json();
    console.log(data,'response data');
    console.log(studentExamModel,'model')
  };

  const renderQuestions = () => {
    if (!quizData || !quizData.Questions) {
      return <p>Loading...</p>; 
    }

    const startIndex = currentPage * QuestionsPerPage;
    const endIndex = Math.min(startIndex + QuestionsPerPage, quizData.Questions.length);
    
    return quizData.Questions.slice(startIndex, endIndex).map((question, index) => (
      <div key={index} className="question p-4 border-2 my-4 border-gray-200">
        <label className='text-lg font-bold p-2'>Question {startIndex + index + 1}</label>
        <p className="font-bold m-2 text-center">{question.Text}</p>
        <div className="choices grid grid-cols-2 gap-4 my-2">
          {question.Options.map((option, optionIndex) => {
            const trimmedOption = option.trim();
            if (trimmedOption) {
              return (
                <div key={optionIndex} className="choice my-2 flex justify-center items-center mb-2">
                  {question.Type === "mcq" ? (
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name={optionIndex}
                        value={optionIndex}
                        checked={userAnswers[startIndex + index] === optionIndex}
                        onChange={(e) => handleUserAnswer(startIndex + index, optionIndex,e.target.name)}
                        disabled={showResult}
                        className="mr-2"
                      />
                      {trimmedOption}
                    </label>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        name='option'
                        value={optionIndex}
                        checked={userAnswers[startIndex + index] && userAnswers[startIndex + index].includes(optionIndex)}
                        onChange={(e) => handleUserMultipleAnswers(startIndex + index, optionIndex, e.target.checked)}
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
                <tbody>
                  <tr>
                    <td className="w-3/4 border-r-2">
                      <table>
                        <tbody>
                          <tr className=''>
                            <td className=" pr-4">Name: {quizData?.exam.Tittle}</td>
                          </tr>
                          <tr className=''>
                            <td className=" pr-4">Description: {quizData?.exam.Describtion}</td>
                          </tr>
                          <tr className=''>
                            <td className=" pr-4">Instruction: {quizData?.exam.Instructions}</td>
                          </tr>
                          <tr className=''>
                            <td className=" pr-4">Total Questions: {questions.length}</td>
                          </tr>
                          <tr>
                            <td className=" pr-4">Total Points: {quizData?.exam.Grades}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td className="w-1/4">
                      <h2 className='text-center'>Time</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <form onSubmit={handleSubmit}>
              {renderQuestions()}
              <div className="flex justify-between mt-4">
                <button type="button" onClick={handlePrev} disabled={currentPage === 0 || showResult} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md focus:outline-none">
                  Previous
                </button>
                <button type="button" onClick={handleNext} disabled={currentPage === Math.ceil(questions.length / QuestionsPerPage) - 1 || showResult} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md focus:outline-none">
                  Next
                </button>
                <button type="submit" className="bg-[#fa5757] text-white px-4 py-2 rounded-md hover:bg-[#eb5252] focus:outline-none">
                  Submit Quiz
                </button>
              </div>
            </form>
            <div className="result mt-4">
              { <h3>Your Score: {`${score} / ${quizData?.exam.Grades}`}</h3>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;
