import "./App.css";
import { Box, Stack, SxProps, Theme } from "@mui/material";
import { TopAppBar } from "./Components/TopAppBar";
import { SideMenu } from "./Components/SideMenu";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./Components/AppRoutes";
import { AppColor } from "./Common/constants";
import { Toasts } from "./Components/Toast";

type LayoutStyles = {
  root: SxProps<Theme>;
  layout: SxProps<Theme>;
  content: SxProps<Theme>;
};

const sx: LayoutStyles = {
  root: {
    backgroundColor: AppColor.Secondary,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  layout: {
    flexGrow: 1,
    overflow: "hidden",
  },

  content: {
    backgroundColor: "grey.200",
    flexGrow: 1,
    overflow: "auto",
  },
};

function App() {
  return (
    <BrowserRouter>
      <Box component="section" sx={sx.root}>
        <TopAppBar />
        <Stack direction="row" sx={sx.layout}>
          <SideMenu />
          <Stack component="main" sx={sx.content}>
            <Toasts />
            <AppRoutes />
          </Stack>
        </Stack>
      </Box>
    </BrowserRouter>
  );
}

export default App;
