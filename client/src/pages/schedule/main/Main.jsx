import { Box } from "@mui/material";
import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import {
  Page,
  Severity,
  defaultAsyncInfo,
} from "../../../constants/common";
import AppointmentView from "../../appointment/AppointmentView";
import Loading from "../../../components/common/Loading";
import Scheduler from "./Scheduler";
import ErrorSnackbar from "../../../components/common/ErrorSnackbar";
import { setPageNavigation } from "../../../features/schedule/scheduleSlice";

const CalenderView = lazy(() => import("./CalenderView"));

const Main = () => {
  const { selectedUser, pageView, pageNavigation } = useSelector(
    (store) => store.schedule
  );
  const [asyncInfo, setAsyncInfo] = useState(defaultAsyncInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pageNavigation.severity !== Severity.NONE) {
      setAsyncInfo({
        ...defaultAsyncInfo,
        message: pageNavigation.message,
        severity: pageNavigation.severity,
      });
      dispatch(setPageNavigation({
        from:null,
        message:"",
        severity:Severity.NONE
      }))
    }
  }, [pageNavigation,dispatch]);

  const handleSnakClose = useCallback(() => setAsyncInfo(defaultAsyncInfo), []);

  if (!selectedUser?.userId) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        select a user to schedule or view appointments
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", bgcolor: "fff" }}>
      <ErrorSnackbar
        open={!!asyncInfo.severity}
        onClose={handleSnakClose}
        message={asyncInfo.message}
        severity={asyncInfo.severity}
      />
      {pageView === Page.CALENDER ? (
        <Box
          sx={{
            height: "100%",
            bgcolor: "fff",
            display: "flex",
            flexDirection: "column",
            overflow:"auto"
          }}
        >
          <Box>
            <UserInfo selectedUser={selectedUser} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "#fff",
              maxWidth: "100vw",
              overflowX: "auto",
              position: "relative",
            }}
          >
            <Suspense fallback={<Loading text="fetching user appointments" />}>
              <Box
                sx={{
                  p: 1,
                  height: "100%",
                }}
              >
                <CalenderView />
              </Box>
            </Suspense>
          </Box>
        </Box>
      ) : pageView === Page.EVENT ? (
          <AppointmentView />
      ) : (
        <Scheduler />
      )}
    </Box>
  );
};

export default Main;
