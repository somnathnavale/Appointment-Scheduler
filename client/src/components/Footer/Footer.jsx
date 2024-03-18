import { Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Stack>
      <Typography
        variant="inherit"
        sx={{
          color: "grey.700",
          bgcolor:"grey.100",
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
