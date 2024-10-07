import { Divider, Paper, Skeleton, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

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
          <Stack rowGap={2} m="1rem">
            <Skeleton height={40} />
            <Divider />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Stack>
        </>
      ) : (
        children
      )}
    </Paper>
  );
};
