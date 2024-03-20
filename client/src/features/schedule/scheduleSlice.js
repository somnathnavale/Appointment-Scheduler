import {createSlice} from "@reduxjs/toolkit";
import { Page } from "../../constants/common";

const initialState={
    selectedUser:null,
    pageView:Page.CALENDER,
    selectedEvent:null
}

const scheduleSlice=createSlice({
    name:"schedule",
    initialState,
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },
        setPageView:(state,action)=>{
            state.pageView=action.payload
        },
        setSelectedEvent:(state,action)=>{
            state.selectedEvent=action.payload
        }
    }
})

export const {setSelectedUser,setPageView,setSelectedEvent} = scheduleSlice.actions;

export default scheduleSlice.reducer;