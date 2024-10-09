import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Logout, Spa } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { AppColor } from "../../Common/constants";
import { useState } from "react";
import { openToast } from "../../Common/toastSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Common/store";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Authentication/FirebaseApp";
import { useAuthContext } from "../Authentication/AuthContext";
import { stringAvatar } from "../../Common/utils";

export const TopAppBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = async () => {
    try {
      localStorage.removeItem("userId");
      await signOut(auth);
      dispatch(
        openToast({
          severity: "success",
          title: "Logged out successfully",
        })
      );
      navigate("/login");
    } catch (error) {
      dispatch(
        openToast({
          severity: "error",
          title: "Error logging out...",
        })
      );
    } finally {
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: AppColor.Primary,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar
        disableGutters
        sx={{ padding: "0 2rem", justifyContent: "space-between" }}
      >
        <Stack direction="row">
          <Spa sx={{ fontSize: "35px", color: AppColor.Secondary }} />
          <Typography
            variant="h4"
            sx={{
              mr: 2,
              ml: 1,
              fontWeight: "bold",
              color: AppColor.Secondary,
            }}
          >
            Finni Health
          </Typography>
        </Stack>

        {currentUser ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={currentUser.displayName ?? "Welcome"}>
              <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                <Avatar
                  {...stringAvatar(currentUser.displayName ?? "Welcome")}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="log-out" onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <Typography sx={{ textAlign: "center" }}>Log out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};
