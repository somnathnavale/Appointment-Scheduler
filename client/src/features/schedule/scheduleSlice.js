import {createSlice} from "@reduxjs/toolkit";

const initialState={
    selectedUser:null,
}

const scheduleSlice=createSlice({
    name:"schedule",
    initialState,
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        }
    }
})

export const {setSelectedUser} = scheduleSlice.actions;

export default scheduleSlice.reducer;