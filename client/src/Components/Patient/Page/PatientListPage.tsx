import { IconButton, Stack, Typography } from "@mui/material";
import {
  AddressType,
  Patient,
  useListPatientsQuery,
} from "../../../Common/apiSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RecentActors, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PatientStatusChip } from "./../PatientStatusChip";
import dayjs from "dayjs";
import { useMemo } from "react";
import { usePatientListContext } from "./../PatientListContext";
import { Page } from "../../Layout/Page";
import { PatientListToolbar } from "../PatientListToolbar";

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
  const { isLoading, data, error } = useListPatientsQuery(filters);

  const columns: GridColDef<Patient>[] = [
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      filterable: false,
    },
    { field: "lastName", headerName: "Last Name", flex: 1, filterable: false },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      type: "date",
      flex: 1,
      valueGetter: (value) => dayjs(value).toDate(),
      renderCell: ({ row }) => {
        return dayjs(row.dateOfBirth).format("LL");
      },
      filterable: true,
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
      filterable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return <PatientStatusChip status={status} />;
      },
      filterable: false,
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      sortable: false,
      filterable: false,
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
    <Page
      sx={{ minHeight: "600px" }}
      title={
        <Stack
          flexDirection="row"
          sx={{
            alignItems: "center",
            mt: "1rem",
            ml: "1rem",
            mb: "1rem",
            height: "51px",
          }}
          columnGap={1}
        >
          <RecentActors fontSize="large" />
          <Typography variant="h5">Patient List</Typography>
        </Stack>
      }
      error={error}
    >
      <PatientListToolbar
        initialSearch={search}
        onSearch={onSearch}
        selectedStatuses={selectedStatuses}
        onSelectedStatusesChange={onSelectedStatusesChange}
        onClearStatuses={onClearFilters}
      />
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={data}
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
        localeText={{
          noRowsLabel:
            filters.search === "" && filters.status.length === 0
              ? "No patients yet"
              : "No patients found",
        }}
      ></DataGrid>
    </Page>
  );
};
