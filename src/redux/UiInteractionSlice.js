import { createSlice } from "@reduxjs/toolkit";


const UiInteractionSlice = createSlice({
    name: 'UiInteraction',
    initialState:{
        showLoginForm: false,
        isSidebarOpen: true,
        showAddCourseForm: false,
        showPaginationButtons: false,
    },
    reducers: {
        showLoginForm: (state) =>{
            state.showLoginForm = !state.showLoginForm;
        },
        toggleSidebar: (state) =>{
            state.isSidebarOpen = !state.isSidebarOpen
        },
        toggleShowAddCourseForm: (state) =>{
            state.showAddCourseForm = !state.showAddCourseForm;
        },
        togglePaginationButtons: (state)=>{
            state.showPaginationButtons = !state.showPaginationButtons;
        }
    }
})

export const {showLoginForm,toggleSidebar,
     toggleShowAddCourseForm,togglePaginationButtons } = UiInteractionSlice.actions;
export default UiInteractionSlice.reducer;