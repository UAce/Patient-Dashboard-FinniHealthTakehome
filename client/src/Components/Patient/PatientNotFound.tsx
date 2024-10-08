import { ErrorOutline } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PatientNotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack m="3rem 0" alignItems="center" width="800px" rowGap={2}>
      <Stack flexDirection="row" columnGap={2} alignItems="center">
        <ErrorOutline fontSize="large" />
        <Typography variant="h5">
          Oops, the patient you are looking for does not exist
        </Typography>
      </Stack>
      <Stack flexDirection="row">
        <Button variant="outlined" onClick={() => navigate("/patients")}>
          Go to patient list
        </Button>
      </Stack>
    </Stack>
  );
};
