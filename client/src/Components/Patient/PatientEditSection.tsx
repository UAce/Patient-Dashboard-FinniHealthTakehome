import { Stack, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

export interface PatientEditSectionProps {
  title: string | ReactNode;
}

export const PatientEditSection = ({
  title,
  children,
}: PatientEditSectionProps & PropsWithChildren) => {
  return (
    <Stack sx={{ margin: "24px 0" }}>
      {typeof title === "string" ? (
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
        >
          {title}
        </Typography>
      ) : (
        title
      )}
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
