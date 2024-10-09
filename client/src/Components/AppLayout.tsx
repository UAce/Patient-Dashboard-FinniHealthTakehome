import { Box, Stack, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";
import { SideMenu } from "./SideMenu";
import { TopAppBar } from "./TopAppBar";
import { AppColor } from "../Common/constants";

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

export const AppLayout = ({ children }: PropsWithChildren) => (
  <Box component="section" sx={sx.root}>
    <TopAppBar />
    <Stack direction="row" sx={sx.layout}>
      <SideMenu />
      <Stack component="main" sx={sx.content}>
        {children}
      </Stack>
    </Stack>
  </Box>
);
