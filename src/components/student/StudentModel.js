import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router'

const StudentModel = () => {
    const [quizData, setQuizData] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [studentAnswers , setStudentAnswers] = useState([]);
    const location = useLocation();
    console.log(location , "loc")
    const {examID , studentID} = location.state;
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData = async()=>{
        const response = await fetch(  `https://academix.runasp.net/api/GradesCenter/GetStudentExam/${examID}/${studentID}`);
        const studentExam = await response.json();
        setQuizData(studentExam.exam);
        setQuestions(studentExam.Questions);
        // setStudentAnswers(studentExam.studentAnswers);
        console.log(studentExam,'data');
    }
    
    
    
      console.log(quizData,'dd')
    // console.log(studentAnswers,'student ans');
    console.log(examID , studentID);
    const renderQuestions = () => {
        if (!quizData && !questions) {
          return <p>Loading...</p>; 
        }
    
        // const startIndex = currentPage * QuestionsPerPage;
        // const endIndex = Math.min(startIndex + QuestionsPerPage, quizData.Questions.length);
         
        return questions.map((question, index) => (
          <div key={index} className="question p-4 border-2 my-4 border-gray-200">
            <label className='text-lg font-bold p-2'>Question {index + 1}</label>
            <p className="font-bold m-2 text-center">{question.Text}</p>
            <div className="choices grid grid-cols-2 gap-4 my-2">
              {question.Options.map((option, optionIndex) => {
                const trimmedOption = option.trim();
                if (trimmedOption) {
                  return (
                    <div key={optionIndex} className="choice my-2 flex justify-center items-center mb-2">
                      {question.Type === "mcq" ? (
                        
                         <div style={{display: 'flex'}}>
                             <div style={{ position: 'relative'}}>
                             <span 
                                  style={{ 
                                    display: 'inline-block',
                                    width: '15px', 
                                    height: '15px', 
                                    borderRadius: '50%', 
                                    // border: '1px solid black', 
                                    padding: '3px',
                                    border: (question?.CorrectAnswr[0] == optionIndex && !question?.StudentAnswer?.includes(+optionIndex))? '2px solid #8be78b':'1px solid black',
                                    backgroundColor:  optionIndex == question?.StudentAnswer&& optionIndex == question?.CorrectAnswr[0] ? '#8be78b' : (optionIndex === question?.StudentAnswer ? "#d60000" : "transparent"), 
                                    marginRight: '5px' 
                                  }}
                                ></span>
                              </div>
                            <span>{trimmedOption}</span>
                        </div>
                          
    
                        
                      ) : (
                        <div style={{display: 'flex'}}>
                             <div style={{ position: 'relative'}}>
                            <span style={{ display:'inline-block',width: '15px', height: '15px', border: (question?.CorrectAnswr?.includes(+optionIndex) && !question?.StudentAnswer?.includes(+optionIndex))? '2px solid #8be78b':'1px solid black', padding: '3px' ,backgroundColor: question?.CorrectAnswr?.includes(optionIndex) && question?.StudentAnswer?.includes(optionIndex) ? '#8be78b' : (question?.StudentAnswer?.includes(optionIndex))? "#d60000" :'trasparent', marginRight: '5px' }}></span>
                            </div>
                            <span>{trimmedOption}</span>
                        </div>
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
          <div className="flex flex-1 justify-center items-center">
            
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
                                <td className=" pr-4">Name: {quizData?.exam?.Tittle}</td>
                              </tr>
                              <tr className=''>
                                <td className=" pr-4">Description: {quizData?.exam?.Describtion}</td>
                              </tr>
                              <tr className=''>
                                <td className=" pr-4">Instruction: {quizData?.exam?.Instructions}</td>
                              </tr>
                              <tr className=''>
                                <td className=" pr-4">Total Questions: {questions.length}</td>
                              </tr>
                              <tr>
                                <td className=" pr-4">Total Points: {quizData?.exam?.Grades}</td>
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
                <form >
                  {renderQuestions()}
                 
                </form>
                <div className="result mt-4">
                  
                </div>
              </div>
            </div>
          </div>
          
        </div>
      );
    };
    


export default StudentModel
