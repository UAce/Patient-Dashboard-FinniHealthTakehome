import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Spa } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { AppColor } from "../constants";

export const TopAppBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: AppColor.Primary }}>
      <Toolbar
        disableGutters
        sx={{ padding: "0 2rem", justifyContent: "space-between" }}
      >
        <Stack direction="row">
          <Spa sx={{ fontSize: "28px", color: AppColor.Secondary }} />
          <Typography
            variant="h5"
            sx={{
              mr: 2,
              ml: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: AppColor.Secondary,
            }}
          >
            Finni Health
          </Typography>
        </Stack>

        <Box sx={{ flexGrow: 0 }}>
          {/* TODO: Show menu with logout */}
          <Tooltip title="settings">
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
