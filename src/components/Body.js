import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import InstructorUI from "./instructor/InstructorUI";
import Header from "./Header";
import Courses from "./instructor/Courses";
import CreateQuiz from "../quiz/CreateQuiz";
import Quiz from "../quiz/Quiz";
import CreateAssignment from "./assignments/CreateAssignment";


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
            path: '/assignment',
            element: <CreateAssignment />
        },
    ]);
    return(
        <div>
        <RouterProvider router={appRouter} />
    </div>
    )
}

export default Body;