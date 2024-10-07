import {
  Chip,
  ChipOwnProps,
  IconButton,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import {
  AddressType,
  InquiryStatus,
  Patient,
  useListPatientsQuery,
} from "../../apiSlice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const PatientListPage = () => {
  const navigate = useNavigate();
  // TODO: Pass search and status filters
  const { isLoading, data } = useListPatientsQuery(undefined, {});
  // const [deletePatient] = useRemovePatientMutation();

  const columns: GridColDef<Patient>[] = [
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
    {
      field: "status",
      headerName: "Intake Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        const statusColor = {
          [InquiryStatus.Churned]: "error" as ChipOwnProps["color"],
          [InquiryStatus.Onboarding]: "info" as ChipOwnProps["color"],
          [InquiryStatus.Active]: "success" as ChipOwnProps["color"],
          [InquiryStatus.Inquiry]: "warning" as ChipOwnProps["color"],
        }[status];

        return <Chip color={statusColor} label={status} />;
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
            {/* <IconButton
              onClick={async () => {
                try {
                  // TODO: Add confirmation dialog + success toast
                  await deletePatient(`${id}`).unwrap();
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              <Delete />
            </IconButton> */}
          </Stack>
        );
      },
    },
  ];

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : (
        // TODO: show empty list if no patients
        <DataGrid
          columns={columns}
          rows={data}
          disableColumnFilter // Disable column filtering
          disableColumnSelector
          sx={{
            "& .MuiDataGrid-container--top [role=row]": {
              backgroundColor: "#d8e5f7",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none", // Remove outline
              boxShadow: "none", // Remove any shadow if applied
            },
          }}
        ></DataGrid>
      )}
    </Paper>
  );
};
