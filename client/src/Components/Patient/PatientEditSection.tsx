import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export interface PatientEditSectionProps {
  title: string;
}

export const PatientEditSection = ({
  title,
  children,
}: PatientEditSectionProps & PropsWithChildren) => {
  return (
    <Stack
      sx={{
        // padding: "24px",
        margin: "24px 0",
        // border: "solid #e6e6e6",
        // borderWidth: "1.5px",
        // borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
      >
        {title}
      </Typography>
      <Stack
        rowGap={2}
        sx={{
          maxWidth: "900px",
          flexWrap: "wrap",
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};
