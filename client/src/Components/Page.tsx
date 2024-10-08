import {
  Box,
  Divider,
  Skeleton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { PatientViewSection } from "./Patient/PatientViewSection";

interface PageProps {
  isLoading?: boolean;
  sx?: SxProps<Theme>;
}
export const Page = ({
  isLoading = false,
  sx,
  children,
}: PageProps & PropsWithChildren) => {
  return (
    <Stack
      sx={{
        margin: "2rem 1rem",
        backgroundColor: "#fff",
        ...sx,
      }}
    >
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
    </Stack>
  );
};
