import {
  Alert,
  Divider,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { PageSkeleton } from "./PageSkeleton";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface PageProps {
  isLoading?: boolean;
  title: string | ReactNode;
  goBackRoute?: string;
  sx?: SxProps<Theme>;
  error?: FetchBaseQueryError | SerializedError;
}
export const Page = ({
  isLoading = false,
  sx,
  error,
  title,
  goBackRoute,
  children,
}: PageProps & PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        margin: "2rem 1rem",
        backgroundColor: "#fff",
        ...sx,
      }}
    >
      {isLoading ? (
        <PageSkeleton />
      ) : (
        <>
          {typeof title === "string" ? (
            <>
              <Stack
                flexDirection="row"
                sx={{ alignItems: "center", mt: "1rem" }}
                columnGap={1}
              >
                {goBackRoute ? (
                  <IconButton onClick={() => navigate(goBackRoute)}>
                    <ArrowBack fontSize="large" />
                  </IconButton>
                ) : null}
                <Typography variant="h5">{title}</Typography>
              </Stack>
              <Divider />
            </>
          ) : (
            title
          )}
          {error ? (
            <Alert severity="error">
              Oops, something went wrong. Please try again.
            </Alert>
          ) : (
            children
          )}
        </>
      )}
    </Stack>
  );
};
