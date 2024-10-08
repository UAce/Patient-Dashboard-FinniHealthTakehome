import { IconButton, Paper, Stack, Typography } from "@mui/material";
import {
  AddressType,
  Patient,
  useListPatientsQuery,
} from "../../../Common/apiSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PatientStatusChip } from "./../PatientStatusChip";
import dayjs from "dayjs";
import { PatientListToolbar } from "./../PatientListToolbar";
import { useMemo } from "react";
import { usePatientListContext } from "./../PatientListContext";
import { Page } from "../../Page";

export const PatientListPage = () => {
  const navigate = useNavigate();
  const {
    search,
    onSearch,
    selectedStatuses,
    onSelectedStatusesChange,
    onClearFilters,
  } = usePatientListContext();

  const filters = useMemo(
    () => ({
      search,
      status: selectedStatuses,
    }),
    [search, selectedStatuses]
  );
  const { isLoading, data } = useListPatientsQuery(filters);

  const columns: GridColDef<Patient>[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
      valueGetter: (dob) => {
        return dayjs(dob).format("LL");
      },
    },
    {
      field: "addresses",
      headerName: "City",
      flex: 1,
      valueGetter: (addresses: Patient["addresses"], row) => {
        const [primaryAddress] = addresses.filter(
          (address) => address.type === AddressType.Primary
        );

        return primaryAddress ? primaryAddress.city : "N/A";
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return <PatientStatusChip status={status} />;
      },
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: ({ id }) => {
        return (
          <Stack flexDirection="row">
            <IconButton onClick={() => navigate(`/patients/${id}`)}>
              <Visibility />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Page>
      <Stack>
        <Typography variant="h5" sx={{ m: "1rem 0.5rem" }}>
          Patient List
        </Typography>

        <PatientListToolbar
          onSearch={onSearch}
          selectedStatuses={selectedStatuses}
          onSelectedStatusesChange={onSelectedStatusesChange}
          onClearStatuses={onClearFilters}
        />
      </Stack>

      <Paper>
        <DataGrid
          loading={isLoading}
          columns={columns}
          rows={data}
          disableColumnFilter
          disableColumnSelector
          sx={{
            "& .MuiDataGrid-container--top [role=row]": {
              backgroundColor: "#ece3de",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
        ></DataGrid>
      </Paper>
    </Page>
  );
};
