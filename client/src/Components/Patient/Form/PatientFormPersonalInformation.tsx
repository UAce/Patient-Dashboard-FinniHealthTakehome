import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { PatientFormSection } from "./PatientFormSection";
import { usePatientFormContext } from "./PatientFormContext";

export const PatientFormPersonalInformation = () => {
  const { patientData, setPatientData } = usePatientFormContext();
  return (
    <PatientFormSection title="Personal Information">
      <TextField
        variant="outlined"
        label="First Name"
        name="firstName"
        defaultValue={patientData?.firstName}
        required
      />
      <TextField
        variant="outlined"
        label="Middle Name"
        name="middleName"
        defaultValue={patientData?.middleName}
      />
      <TextField
        variant="outlined"
        label="Last Name"
        name="lastName"
        defaultValue={patientData?.lastName}
        required
      />
      <DatePicker
        label="Date of Birth"
        name="dateOfBirth"
        defaultValue={patientData ? dayjs(patientData.dateOfBirth) : undefined}
        onChange={(date: Dayjs | null) => {
          if (date) {
            setPatientData({
              ...patientData,
              dateOfBirth: date.toISOString(),
            });
          }
        }}
      />
    </PatientFormSection>
  );
};
