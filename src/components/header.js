import { Typography, Divider } from "@mui/material";

export default function Header() {
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        Welcome to My Store
      </Typography>
      <Divider sx={{ marginY: 4 }} />
    </>
  );
}
