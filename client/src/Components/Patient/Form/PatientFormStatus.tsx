import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { IntakeStatus } from "../../../Common/apiSlice";
import { usePatientFormContext } from "./PatientFormContext";

export const PatientFormStatus = () => {
  const { patientData, setPatientData } = usePatientFormContext();

  return (
    <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
      <InputLabel id="status-dropdown-label">Status</InputLabel>
      <Select
        labelId="status-dropdown-label"
        defaultValue={IntakeStatus.Inquiry}
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
