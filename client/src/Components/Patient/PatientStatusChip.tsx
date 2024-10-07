import { ChipOwnProps, Chip } from "@mui/material";
import { InquiryStatus } from "../../apiSlice";

export const PatientStatusChip = ({ status }: { status: InquiryStatus }) => {
  const statusColor = {
    [InquiryStatus.Churned]: "error" as ChipOwnProps["color"],
    [InquiryStatus.Onboarding]: "info" as ChipOwnProps["color"],
    [InquiryStatus.Active]: "success" as ChipOwnProps["color"],
    [InquiryStatus.Inquiry]: "warning" as ChipOwnProps["color"],
  }[status];

  return <Chip color={statusColor} label={status} />;
};
