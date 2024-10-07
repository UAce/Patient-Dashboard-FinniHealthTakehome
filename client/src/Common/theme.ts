import { createTheme } from "@mui/material";
import { AppColor } from "./constants";

export const theme = createTheme({
  palette: {
    primary: {
      main: AppColor.Primary,
    },
    secondary: {
      main: AppColor.Secondary,
    },
  },
  components: {
    // MuiPaper: {
    //   defaultProps: {
    //     sx: {
    //       backgroundColor: AppColor.Secondary,
    //     },
    //   },
    // },
  },
});
