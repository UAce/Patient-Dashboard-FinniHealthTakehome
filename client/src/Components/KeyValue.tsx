import { Box, Stack, Typography } from "@mui/material";

export interface KeyValueProps {
  name: string;
  value?: string | number | null;
}

export const KeyValue = ({ name, value }: KeyValueProps) => {
  const stringValue = typeof value === "string" ? value : value?.toString();

  return (
    <Stack sx={{ width: "250px" }}>
      <Box component="dt">
        <Typography sx={{ fontWeight: "bold", color: "grey.700" }}>
          {name}
        </Typography>
      </Box>
      <Stack
        component="dd"
        direction="row"
        sx={{
          margin: 0,
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "1rem",
        }}
      >
        <Typography sx={{ wordBreak: "break-all", color: "grey.700" }}>
          {stringValue}
        </Typography>
      </Stack>
    </Stack>
  );
};
