import React from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Box, Grid, } from "@mui/material";
import PeopleView from "./people/PeopleView";
import Main from "./main/Main";

const Schedule = () => {
  return (
    <Box sx={{ bgcolor: "grey.200", height: "100%" }}>
      <InnerLayout style={{ p: 2, color: "grey.primary",height:"100%" }} height="100%">
        <Grid container spacing={2} height="100%">
          <Grid item xs={4} height="100%">
            <PeopleView/>
          </Grid>
          <Grid item xs={8} height="100%">
            <Main/>
          </Grid>
        </Grid>
      </InnerLayout>
    </Box>
  );
};

export default Schedule;
