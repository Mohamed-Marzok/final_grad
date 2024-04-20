import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import InstructorUI from "./instructor/InstructorUI";
import Courses from "./instructor/Courses";
import CreateQuiz from "../quiz/CreateQuiz";
import Quiz from "../quiz/Quiz";
import CoursePage from "./instructor/CoursePage";
import Lecture from "./instructor/Lecture";
import StudentUI from "./student/StudentUI";
import Exams from "./student/Exams";
import ContentView from "./instructor/ContentView";
import Demo from "./demo";


const Body = () =>{

    

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/instructor',
            element: <InstructorUI />,
            children: [
                {
                    path: '/instructor',
                    element: <ContentView />
                },
                {
                    path: 'courses',
                    element: <Courses />
                },
                {
                    path: 'createquiz',
                    element: <CreateQuiz />
                },
                {
                    path: 'coursepage/:id',
                    element: <CoursePage />,
                    children: [
                        {
                            path: 'createquiz',
                            element: <CreateQuiz />
                        },
                        {
                            path: 'quiz',
                            element: <Quiz />
                        }
                    ]
                }
            ]
        },
        {
            path: '/student',
            element: <StudentUI />,
            children: [
                {
                    path: 'courses',
                    element: <Courses />,
                },
                {
                    path: 'exams',
                    element: <Exams />,
                },
                {
                    path: 'coursepage/:id',
                    element: <CoursePage />
                }
            ]
        },
        {
            path:'/demo',
            element: <Demo/>
        },
        {
            path: '/quiz',
            element: <Quiz />
        },
        {
            path: '/coursepage',
            element: <CoursePage />
        },
        {
            path: '/lectures',
            element: <Lecture />
        },
        
    ]);
    return(
        <div>
        <RouterProvider router={appRouter} />
    </div>
    )
}

export default Body;