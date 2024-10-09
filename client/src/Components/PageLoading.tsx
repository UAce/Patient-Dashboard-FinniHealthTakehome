import { Stack, Paper, CircularProgress } from "@mui/material";
import { AppColor } from "../Common/constants";

export const PageLoading = () => {
  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: AppColor.Secondary,
      }}
    >
      <Paper
        sx={{
          padding: "4rem 2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
        }}
      >
        <CircularProgress />
      </Paper>
    </Stack>
  );
};
