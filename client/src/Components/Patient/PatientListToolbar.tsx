import { Add, Clear, KeyboardArrowDown, Search } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Chip,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState, MouseEvent } from "react";
import { IntakeStatus } from "../../Common/apiSlice";
import { PatientStatusChip } from "./PatientStatusChip";
import { useNavigate } from "react-router-dom";

interface PatientListToolbarProps {
  onSearch: (searchTerm: string) => void;
  selectedStatuses: IntakeStatus[];
  onSelectedStatusesChange: (nextStatuses: IntakeStatus[]) => void;
  onClearStatuses: () => void;
}

export const PatientListToolbar = ({
  onSearch,
  selectedStatuses,
  onSelectedStatusesChange,
  onClearStatuses,
}: PatientListToolbarProps) => {
  const navigate = useNavigate();

  // search
  const [search, setSearch] = useState("");
  const handleSearch = (_search: string) => {
    setSearch(_search);
    onSearch && onSearch(_search);
  };

  // status filter
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const options = Object.values(IntakeStatus);
  const isSelected = (status: IntakeStatus) =>
    selectedStatuses.includes(status);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (nextStatus: IntakeStatus) => {
    const isStatusSelected = selectedStatuses.includes(nextStatus);
    const nextStatuses = isStatusSelected
      ? selectedStatuses.filter((status) => status !== nextStatus)
      : [...selectedStatuses, nextStatus];
    onSelectedStatusesChange(nextStatuses);
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      height="56px"
      mb={2}
      mr={2}
    >
      <Stack flexDirection="row" alignItems={"center"}>
        <FormControl
          sx={{
            m: 1,
            width: "600px",
          }}
          variant="outlined"
        >
          <InputLabel htmlFor="patient-list-search">
            Search name or city
          </InputLabel>
          <OutlinedInput
            id="patient-list-search"
            label="Search name or city"
            endAdornment={
              search ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleSearch("")} size="small">
                    <Clear />
                  </IconButton>
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }
            inputProps={{
              "aria-label": "search",
            }}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </FormControl>
        <ClickAwayListener onClickAway={handleClose}>
          <>
            <Button
              id="button-sort-by-selector"
              aria-controls={isMenuOpen ? "menu-sort-by-selector" : undefined}
              aria-haspopup="true"
              aria-expanded={isMenuOpen ? "true" : undefined}
              variant="outlined"
              onClick={(event: MouseEvent<HTMLElement>) =>
                setAnchorEl(event.currentTarget)
              }
              endIcon={<KeyboardArrowDown />}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >
              Status Filter
            </Button>
            <Menu
              id="menu-sort-by-selector"
              MenuListProps={{
                "aria-labelledby": "button-sort-by-selector",
                sx: {
                  minWidth: "200px",
                },
              }}
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleClose}
              elevation={2}
              sx={{ maxHeight: "80vh" }}
            >
              {options.map((status) => (
                <MenuItem
                  key={status}
                  sx={{ marginX: 0.5 }}
                  onClick={(e) => {
                    handleClick(status);
                    e.preventDefault(); // Avoid triggering onClick twice which is caused by checkbox event handlers
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox checked={isSelected(status)} name={status} />
                    }
                    label={status}
                  />
                </MenuItem>
              ))}
            </Menu>
          </>
        </ClickAwayListener>

        {selectedStatuses.length > 0 ? (
          <Stack flexDirection="row" columnGap={1} ml={2}>
            {selectedStatuses.map((status) => (
              <PatientStatusChip status={status} key={status} />
            ))}
            <Chip
              clickable
              color="default"
              label={"Clear Statuses"}
              onClick={onClearStatuses}
              size="medium"
              variant="outlined"
              icon={<Clear />}
              sx={{
                ml: 1,
              }}
            />
          </Stack>
        ) : null}
      </Stack>

      <Button
        variant="contained"
        startIcon={<Add fontSize="large" />}
        sx={{
          width: "160px",
          height: "100%",
          color: "white",
        }}
        onClick={() => navigate("/patients/add")}
      >
        Add Patient
      </Button>
    </Stack>
  );
};
