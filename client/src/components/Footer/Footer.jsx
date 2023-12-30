import { Stack, Typography, alpha } from "@mui/material";

const Footer = () => {
  return (
    <Stack>
      <Typography
        variant="inherit"
        sx={{
          color: "primary.main",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          textAlign: "center",
          p: 1,
        }}
      >
        All Rights Reserved &copy; {new Date().getFullYear()}
      </Typography>
    </Stack>
  );
};

export default Footer;
