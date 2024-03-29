import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import meeting from "../../assets/meeting.png";
import onlineMeeting from "../../assets/onlinemeeting.png";
import InnerLayout from "../../components/Layout/InnerLayout";
import axiosPublic from "../../config/axios";

const styles = {
  gridItem: { bgcolor: "#fff", boxShadow: "", borderRadius: 4, p: 2 },
  image: {
    objectFit: "cover",
    maxHeight: "inherit",
    height: "100%",
    width: "auto",
  },
  imageWrapper: { maxHeight: "80px", mb: 1 },
  innerLayout: { py: 4, textAlign: "center", color: "primary.main" },
};

const Stats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await axiosPublic.get("/api/common/meet-stats");
        const statsObj = response.data.reduce((acc, curr) => {
          acc[curr.type] = curr.count;
          return acc;
        }, {});
        setStats(statsObj);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      <Typography variant="h3">Appointment Statistics</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary" }}>
        Total appointment schedule on calendify
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
        columnGap={4}
      >
        <Grid item xs={12} sm={3}>
          <Paper elevation={2} sx={styles.gridItem}>
            <Box sx={styles.imageWrapper}>
              <img src={meeting} style={styles.image} />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="grey.700">
                In Person Meet
              </Typography>
              <Typography variant="body1" color="grey.600">
                {stats?.IN_PERSON}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper elevation={2} sx={styles.gridItem}>
            <Box sx={styles.imageWrapper}>
              <img src={onlineMeeting} style={styles.image} />
            </Box>
            <Typography variant="subtitle2" color="grey.700">
              Virtual Meet UP
            </Typography>
            <Typography variant="body1" color="grey.600">
              {stats?.VIRTUAL_MEET}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const WrappedStats = () => {
  return (
    <InnerLayout bgcolor="grey.200" style={styles.innerLayout}>
      <Stats />
    </InnerLayout>
  );
};

export default WrappedStats;
