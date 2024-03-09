import {configureStore} from '@reduxjs/toolkit'
import UiInteractionSlice from "./UiInteractionSlice";
import  addCourseSlice  from './addCourseSlice';
import quizReducer from './quizSlice'
const store = configureStore({
    reducer: {
        UiInteraction: UiInteractionSlice,
        addCourse: addCourseSlice,
        quiz: quizReducer,
    }
})

export default store;