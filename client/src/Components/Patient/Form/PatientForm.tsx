import { Box, Stack, Button } from "@mui/material";
import { BaseSyntheticEvent, FormEvent } from "react";
import { PatientFormPersonalInformation } from "./PatientFormPersonalInformation";
import { PatientFormAddresses } from "./PatientFormAddresses";
import { PatientFormMetadata } from "./PatientFormMetadata";
import { usePatientFormContext } from "./PatientFormContext";
import { AppColor } from "../../../Common/constants";
import { PatientFormStatus } from "./PatientFormStatus";

interface PatientFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  action: "Add" | "Save";
}

export const PatientForm = ({ onSubmit, action }: PatientFormProps) => {
  const { patientData, setPatientData } = usePatientFormContext();

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
      onSubmit={onSubmit}
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
          spacing={2}
          mt={2}
          sx={{ maxWidth: "100%" }}
          flexDirection="row-reverse"
        >
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: AppColor.Primary,
              width: "100px",
              color: "white",
            }}
          >
            {action}
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
