import { createSlice } from "@reduxjs/toolkit";
import { Page, Severity } from "../../constants/common";

const initialState = {
  selectedUser: null,
  pageView: Page.CALENDER,
  selectedEvent: null,
  pageNavigation: {
    from: null,
    message: "",
    severity: Severity.NONE,
  },
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setPageView: (state, action) => {
      state.pageView = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setPageNavigation: (state, action) => {
      state.pageNavigation = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setPageView,
  setSelectedEvent,
  setPageNavigation,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
