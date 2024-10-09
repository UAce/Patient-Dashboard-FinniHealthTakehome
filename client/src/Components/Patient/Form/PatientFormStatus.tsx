import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IntakeStatus } from "../../../Common/apiSlice";
import { usePatientFormContext } from "./PatientFormContext";
import { useState } from "react";

export const PatientFormStatus = () => {
  const { patientData, setPatientData } = usePatientFormContext();
  const [initialStatus, _] = useState(
    patientData?.status || IntakeStatus.Inquiry
  );

  return (
    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
      <InputLabel id="status-dropdown-label">Status</InputLabel>
      <Select
        labelId="status-dropdown-label"
        defaultValue={initialStatus}
        onChange={(e) => {
          setPatientData({
            ...patientData,
            status: e.target.value as IntakeStatus,
          });
        }}
        label="Status"
      >
        {Object.values(IntakeStatus).map((status, index) => {
          return (
            <MenuItem value={status} key={`status-${index}`}>
              {status}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
