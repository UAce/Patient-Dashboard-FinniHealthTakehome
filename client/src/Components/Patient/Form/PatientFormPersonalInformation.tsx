import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs, isDayjs } from "dayjs";
import { PatientFormSection } from "./PatientFormSection";
import { usePatientFormContext } from "./PatientFormContext";
import { useState } from "react";

export const PatientFormPersonalInformation = () => {
  const { patientData, setPatientData } = usePatientFormContext();
  const [dobError, setDobError] = useState(false);

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
        minDate={dayjs(new Date("1900-01-01"))}
        maxDate={dayjs(new Date())}
        slotProps={{
          textField: {
            variant: "outlined",
            required: true,
            error: dobError,
            helperText: dobError ? "Please set a valid date of birth" : "",
          },
        }}
        defaultValue={patientData ? dayjs(patientData.dateOfBirth) : undefined}
        onChange={(date: Dayjs | null) => {
          if (
            isDayjs(date) &&
            date.isValid() &&
            date.isBefore(new Date()) &&
            date.isAfter(new Date("1900-01-01"))
          ) {
            setDobError(false);
            setPatientData({
              ...patientData,
              dateOfBirth: date.toISOString(),
            });
          } else {
            setDobError(true);
          }
        }}
      />
    </PatientFormSection>
  );
};
