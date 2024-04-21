import React, { memo } from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Grid } from "@mui/material";
import PeopleView from "./people/PeopleView";
import Main from "./main/Main";
import { useSelector } from "react-redux";
import { Page } from "../../constants/common";

const styles = {
  innerLayout: {
    p: 2,
    pb: "0 !important",
    color: "grey.primary",
    height: "100%",
  },
};

const Schedule = memo(() => {
  const { pageView } = useSelector((store) => store.schedule);
  return (
    <Grid
      container
      spacing={2}
      height="inherit"
      sx={{
        minHeight: {
          md: "calc( 100vh - 120px )",
        },
      }}
      alignItems="stretch"
    >
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          height: { xs: "auto" },
          maxHeight: {
            xs: "300px",
            md: "calc( 100vh - 120px )",
          },
          mb: { xs: 4, sm: 0 },
          overflow: "auto",
        }}
      >
        <PeopleView />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          pt: 4,
          overflow: "hidden",
          maxHeight: {
            xs: "inherit",
            md: pageView === Page.EVENT ? "inherit" : "calc( 100vh - 120px )",
          },
        }}
      >
        <Main />
      </Grid>
    </Grid>
  );
});

Schedule.displayName = "Schedule";

const WrappedSchedule = () => {
  return (
    <InnerLayout style={styles.innerLayout} height="100%" bgcolor="grey.200">
      <Schedule />
    </InnerLayout>
  );
};

export default WrappedSchedule;
