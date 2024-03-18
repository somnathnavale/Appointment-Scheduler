import React from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Box, Grid, } from "@mui/material";
import PeopleView from "./people/PeopleView";
import SchedulerView from "./SchedulerView";

const Schedule = () => {
  return (
    <Box sx={{ bgcolor: "grey.200", height: "100%" }}>
      <InnerLayout style={{ p: 2, color: "grey.primary" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <PeopleView/>
          </Grid>
          <Grid item xs={8}>
            <SchedulerView/>
          </Grid>
        </Grid>
      </InnerLayout>
    </Box>
  );
};

export default Schedule;
