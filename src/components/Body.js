import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import InstructorUI from "./instructor/InstructorUI";
import Courses from "./instructor/Courses";
import CreateQuiz from "../quiz/CreateQuiz";
import Quiz from "../quiz/Quiz";
import CoursePage from "./instructor/CoursePage";
import Lecture from "./instructor/Lecture";


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
            element: <InstructorUI />
        },
        {
            path: '/courses',
            element: <Courses />
        },
        {
            path: '/createquiz',
            element: <CreateQuiz />
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