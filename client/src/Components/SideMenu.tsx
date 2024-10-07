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

type SideMenuStyles = {
  drawer: SxProps<Theme>;
};

const sx: SideMenuStyles = {
  drawer: {
    width: "200px",
    "& .MuiDrawer-paper": {
      position: "relative",
      width: "200px",
    },
  },
};

export const SideMenu = () => {
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
          <ListItemButton>
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
