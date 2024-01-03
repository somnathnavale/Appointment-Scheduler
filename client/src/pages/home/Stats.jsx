import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Layout from "./Layout";
import meeting from "../../assets/meeting.png";
import onlineMeeting from "../../assets/onlinemeeting.png";

const styles = {
  gridItem: { bgcolor: "#fff", boxShadow: "", borderRadius: 4, p: 2 },
  image: {
    objectFit: "cover",
    maxHeight: "inherit",
    height: "100%",
    width: "auto",
  },
  imageWrapper: { maxHeight: "80px", mb: 1 },
};

const Stats = () => {
  return (
    <Layout
      bgcolor="grey.200"
      style={{ py: 4, textAlign: "center", color: "primary.main" }}
    >
      <Box>
        <Typography variant="h3">Appointment Statistics</Typography>
        <Typography variant="body1" sx={{ color: "grey.500" }}>
          Total appointment schedule on calendify
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2 }}
          columnGap={4}
        >
          <Grid item xs={12} sm={3} sx={styles.gridItem}>
            <Box sx={styles.imageWrapper}>
              <img src={meeting} style={styles.image} />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="grey.700">
                In Person Meet
              </Typography>
              <Typography variant="body1" color="grey.600">
                54
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} sx={styles.gridItem}>
            <Box sx={styles.imageWrapper}>
              <img src={onlineMeeting} style={styles.image} />
            </Box>
            <Typography variant="subtitle2" color="grey.700">
              Video Conference Call
            </Typography>
            <Typography variant="body1" color="grey.600">
              30
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Stats;
