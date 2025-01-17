import {configureStore} from '@reduxjs/toolkit'
import UiInteractionSlice from "./UiInteractionSlice";
import  addCourseSlice  from './addCourseSlice';
import quizReducer from './quizSlice';
import lectureReducer from './addLectureSlice';
import postReducer from './addLectureSlice';
import userReducer from './userSlice'
const store = configureStore({
    reducer: {
        UiInteraction: UiInteractionSlice,
        addCourse: addCourseSlice,
        quiz: quizReducer,
        addLecture: lectureReducer,
        addPost: postReducer,
        user: userReducer,
    }
})

export default store;