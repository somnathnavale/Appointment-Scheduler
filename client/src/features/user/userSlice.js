import { createSlice } from "@reduxjs/toolkit"

const initialState={
    user:{
        id:"SN011",
        firstname:"Somnath",
        lastname:"Navale",
        email:"somnathnavale@gmail.com",
        token:"loremipsum",
    }
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user={...state.user,...action.payload}
        }
    }
})

export const {setUser}=userSlice.actions;

export default userSlice.reducer;

