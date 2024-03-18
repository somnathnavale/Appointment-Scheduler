import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import scheduleReducer from "../features/schedule/scheduleSlice";

const store=configureStore({
    reducer:{
        user:userReducer,
        schedule: scheduleReducer
    }
});

export default store;