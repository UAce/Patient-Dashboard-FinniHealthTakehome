import { Paper, Skeleton } from "@mui/material";
import { AddressType, Patient, useListPatientsQuery } from "../apiSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";

export const PatientListPage = () => {
  // TODO: Pass search and status filters
  const { isLoading, data } = useListPatientsQuery(undefined, {});

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
      valueGetter: (dob) => {
        return format(dob, "MM/dd/yyyy");
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
    { field: "status", headerName: "Intake Status", flex: 1 },
  ];

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : (
        // TODO: show empty list if no patients
        <DataGrid columns={columns} rows={data}></DataGrid>
      )}
    </Paper>
  );
};
