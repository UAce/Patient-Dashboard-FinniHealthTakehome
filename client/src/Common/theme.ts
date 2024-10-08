import { createTheme } from "@mui/material";
import { AppColor } from "./constants";

export const theme = createTheme({
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: AppColor.Primary,
    },
    secondary: {
      main: AppColor.Secondary,
    },
  },
});
