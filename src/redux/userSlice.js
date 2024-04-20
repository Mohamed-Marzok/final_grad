import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: 'user',
    initialState:{

    },
    reducers: {
        addUser: (state , action)=>{
            Object.assign(state, action.payload);
        },
        removeUser: (state)=>{
            state = {};
        }
    }
    
})

export const {addUser , removeUser} = userSlice.actions;
export default userSlice.reducer;