import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import poster from "../../assets/homeposter.jpg";
import CustomButton from "../../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import InnerLayout from "../../components/Layout/InnerLayout";
import { AppRoutes } from "../../constants/routes";

const styles = {
  schBtn: { width: "auto" },
};

const Poster = () => {
  const navigate = useNavigate();

  const handleNaviagete = useCallback(() => navigate(AppRoutes.SCHEDULE), [navigate]);

  return (
    <InnerLayout bgcolor="#fff">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "center", sm: "flex-start" },
            justifyContent: "center",
            maxWidth: { xs: "100%", sm: "50%" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{ maxWidth: { sm: "75%" } }}
          >
            <Typography variant="span" color="text.secondary">
              Schedule using
            </Typography>{" "}
            Calendify
          </Typography>
          <Typography variant="body1" paragraph color="text.disabled">
            Planning made easy! Schedule appointments effortlessly, stay
            organized, and boost productivity with our user-friendly website
          </Typography>
          <CustomButton
            btnText="Schedule"
            type="button"
            color="secondary"
            style={styles.schBtn}
            onClick={handleNaviagete}
          />
        </Box>
        <Box
          sx={{
            height: { xs: "250px", sm: "50vh" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={poster}
            alt="image"
            height="100%"
            width="auto"
            style={{ objectFit: "cover" }}
          />
        </Box>
      </Box>
    </InnerLayout>
  );
};

export default Poster;
