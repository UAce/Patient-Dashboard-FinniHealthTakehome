import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export interface PatientViewSectionProps {
  title: string;
}

export const PatientViewSection = ({
  title,
  children,
}: PatientViewSectionProps & PropsWithChildren) => {
  return (
    <Stack
      sx={{
        padding: "24px",
        margin: "24px 0",
        maxWidth: "900px",
        border: "solid #e6e6e6",
        borderWidth: "1.5px",
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
      >
        {title}
      </Typography>
      <Stack
        flexDirection="row"
        columnGap={5}
        rowGap={1}
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
