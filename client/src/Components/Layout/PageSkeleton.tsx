import { Stack, Typography, Skeleton, Divider, Box } from "@mui/material";
import { PatientViewSection } from "../Patient/PatientViewSection";

export const PageSkeleton = () => {
  return (
    <>
      <Stack flexDirection="row" ml={3}>
        <Typography variant="h5" width="300px">
          <Skeleton />
        </Typography>
      </Stack>
      <Divider />
      <Box
        sx={{
          margin: "24px",
          maxWidth: "900px",
        }}
      >
        <Stack flexDirection="row">
          <Stack flexDirection="row">
            <Typography variant="h6" width="300px">
              <Skeleton />
            </Typography>
          </Stack>
        </Stack>

        <PatientViewSection title={<Skeleton />}>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
        </PatientViewSection>

        <PatientViewSection title={<Skeleton />}>
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
          <Skeleton width="100%" />
        </PatientViewSection>
      </Box>
    </>
  );
};
