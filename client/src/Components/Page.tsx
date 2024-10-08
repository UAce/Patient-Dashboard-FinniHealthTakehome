import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { PatientViewSection } from "./Patient/PatientViewSection";

interface PageProps {
  isLoading?: boolean;
}
export const Page = ({
  isLoading = false,
  children,
}: PageProps & PropsWithChildren) => {
  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
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
      ) : (
        children
      )}
    </Paper>
  );
};
