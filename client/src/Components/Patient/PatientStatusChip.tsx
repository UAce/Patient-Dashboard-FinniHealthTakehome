import { ChipOwnProps, Chip } from "@mui/material";
import { IntakeStatus } from "../../Common/apiSlice";

export const PatientStatusChip = ({ status }: { status: IntakeStatus }) => {
  const statusColor = {
    [IntakeStatus.Churned]: "error" as ChipOwnProps["color"],
    [IntakeStatus.Onboarding]: "info" as ChipOwnProps["color"],
    [IntakeStatus.Active]: "success" as ChipOwnProps["color"],
    [IntakeStatus.Inquiry]: "warning" as ChipOwnProps["color"],
  }[status];

  return <Chip color={statusColor} label={status} />;
};
