import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    resetUser: (state, action) => {
      state.user = {};
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
