import React, { useEffect, useState } from 'react'

const Demo = () => {
    const [quiz , setQuiz] = useState([]);
    useEffect(()=>{
        const fetchQuizDataAndQuestions = async () => {
            try {
              const info = await fetchQuizData();
              const questions = await fetchQuizQuestions();
              setQuiz([info, ...questions]);
            } catch (error) {
              console.error('Error fetching quiz data and questions:', error);
            }
          };
      
          fetchQuizDataAndQuestions();
    },[])
    console.log(quiz,'quiz')
    const fetchQuizData = async () => {
        try {
          const response = await fetch('https://academix.runasp.net/api/Exams/GetExam?id=1');
          if (!response.ok) {
            throw new Error('Failed to fetch quiz data');
          }
          const data = await response.json();
          console.log('Fetched quiz data:', data);
          return data;
        } catch (error) {
          console.error('Error fetching quiz data:', error);
        }
      };
      const fetchQuizQuestions = async () => {
        try {
          const response = await fetch('https://academix.runasp.net/api/Exams/GetExamQuestion?id=1');
          if (!response.ok) {
            throw new Error('Failed to fetch questions');
          }
          const questionsData = await response.json();
          console.log('Fetched questions:', questionsData);
          return questionsData;
        } catch (error) {
          console.error('Error fetching questions:', error);
          return [];
        }
      };
  return (
    <div>
      
    </div>
  )
}

export default Demo
