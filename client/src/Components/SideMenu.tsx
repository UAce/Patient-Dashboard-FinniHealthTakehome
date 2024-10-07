import { Person } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

type SideMenuStyles = {
  drawer: SxProps<Theme>;
};

const sx: SideMenuStyles = {
  drawer: {
    width: "15rem",
    "& .MuiDrawer-paper": {
      position: "relative",
      width: "15rem",
    },
  },
};

export const SideMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer variant="permanent" sx={sx.drawer}>
      <List
        sx={{ width: "100%" }}
        disablePadding
        subheader={
          <ListSubheader sx={{ fontWeight: "bold", color: "black" }}>
            Main
          </ListSubheader>
        }
      >
        <ListItem sx={{ padding: 0 }}>
          <ListItemButton
            selected={pathname.startsWith("/patients")}
            onClick={() => navigate("/patients")}
          >
            <ListItemIcon
              sx={{
                minWidth: (theme) => theme.spacing(4),
                color: "inherit",
              }}
            >
              <Person />
            </ListItemIcon>
            <ListItemText primary="Patients" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
