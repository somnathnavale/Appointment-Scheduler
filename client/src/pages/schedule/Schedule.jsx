import React from "react";
import InnerLayout from "../../components/Layout/InnerLayout";
import { Box, Grid } from "@mui/material";
import PeopleView from "./people/PeopleView";
import Main from "./main/Main";

const Schedule = () => {
  return (
    <Box sx={{ bgcolor: "grey.200", height: "100%" }}>
      <InnerLayout
        style={{
          p: 2,
          pb: "0 !important",
          color: "grey.primary",
          height: "100%",
        }}
        height="100%"
      >
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
      </InnerLayout>
    </Box>
  );
};

export default Schedule;
