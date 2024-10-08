import { Chip } from "@mui/material";
import { IntakeStatus } from "../../Common/apiSlice";

export const PatientStatusChip = ({ status }: { status: IntakeStatus }) => {
  const statusColor = {
    [IntakeStatus.Churned]: "#EE7674",
    [IntakeStatus.Onboarding]: "#48ACF0",
    [IntakeStatus.Active]: "#7BD389",
    [IntakeStatus.Inquiry]: "#F3A738",
  }[status];

  return (
    <Chip
      sx={{
        color: "white",
        backgroundColor: statusColor,
      }}
      label={status}
    />
  );
};
