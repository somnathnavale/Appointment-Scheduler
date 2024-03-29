import React, { memo } from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Box, Grid } from "@mui/material";
import PeopleView from "./people/PeopleView";
import Main from "./main/Main";

const styles = {
  innerLayout: {
    p: 2,
    pb: "0 !important",
    color: "grey.primary",
    height: "100%",
  },
};

const Schedule = memo(() => {
  return (
    <Grid
      container
      spacing={2}
      height="100%"
      sx={{
        maxHeight: { xs: "inherit", md: "calc( 100vh - 120px )" },
      }}
    >
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          height: { xs: "auto", md: "100%" },
          maxHeight: { xs: "300px", md: "inherit" },
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
          height: { md: "100%" },
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
