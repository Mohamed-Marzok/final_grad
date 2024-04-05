import { createSlice } from "@reduxjs/toolkit";


const addPostSlice = createSlice({
    name: 'addPostSlice',
    initialState: [],
    reducers: {
        addPost: (state, action) => {
            console.log("Reducer is called with action:", action);
            state.push(action.payload);
            console.log(action.payload, 'hs');
        }
    }
});


export const {addPost} = addPostSlice.actions;
export default addPostSlice.reducer;