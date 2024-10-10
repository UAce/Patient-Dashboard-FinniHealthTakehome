import { Box, Stack, Button } from "@mui/material";
import { BaseSyntheticEvent, FormEvent, useState } from "react";
import { PatientFormPersonalInformation } from "./PatientFormPersonalInformation";
import { PatientFormAddresses } from "./PatientFormAddresses";
import { PatientFormMetadata } from "./PatientFormMetadata";
import { usePatientFormContext } from "./PatientFormContext";
import { AppColor } from "../../../Common/constants";
import { PatientFormStatus } from "./PatientFormStatus";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmDialog } from "../../ConfirmDialog";

interface PatientFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  action: "Add" | "Save";
}

export const PatientForm = ({ onSubmit, action }: PatientFormProps) => {
  const { patientData, setPatientData, isTouched, setIsTouched } =
    usePatientFormContext();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCancel = () => {
    // Remove the last part of the location path name
    const currentPath = location.pathname;
    const segments = currentPath.split("/");
    segments.pop();
    const newPath = segments.join("/");

    navigate(newPath);
  };

  return (
    <form
      onChange={(event: BaseSyntheticEvent) => {
        const { name, value } = event.target;

        if (name) {
          const newPatientData = {
            ...patientData,
            [name]: value,
          };
          setPatientData(newPatientData);
        }
      }}
      onSubmit={(e) => {
        onSubmit(e);
        setIsTouched(false);
      }}
    >
      <Box
        sx={{
          margin: "24px",
          width: "500px",
        }}
      >
        <PatientFormStatus />
        <PatientFormPersonalInformation />
        <PatientFormAddresses />
        <PatientFormMetadata />
        <Stack
          columnGap={1}
          mt={2}
          sx={{ maxWidth: "100%", justifyContent: "flex-end" }}
          flexDirection="row"
        >
          <Button
            variant="outlined"
            onClick={() => {
              console.log({
                isTouched,
              });
              if (isTouched) {
                setOpenDialog(true);
              } else {
                handleCancel();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: AppColor.Primary,
              color: "white",
            }}
          >
            {action}
          </Button>
          <ConfirmDialog
            cancelText="Close"
            confirmText="Cancel"
            message="You have some unsaved changes. Are you sure you want to cancel?"
            title="Cancel"
            onAccept={handleCancel}
            onCancel={() => setOpenDialog(false)}
            open={openDialog}
          />
        </Stack>
      </Box>
    </form>
  );
};
