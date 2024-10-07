import { IconButton, Paper, Skeleton, Stack, Typography } from "@mui/material";
import { useGetPatientByIdQuery } from "../../apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { ArrowBack } from "@mui/icons-material";

export const PatientViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : // TODO: show empty list if no patients
      data ? (
        <>
          <Stack flexDirection="row" sx={{ alignItems: "center" }}>
            <IconButton onClick={() => navigate("/patients")}>
              <ArrowBack fontSize="large" />
            </IconButton>
            <Typography variant="h5">Patient Information</Typography>
          </Stack>
          <Typography>
            {data.firstName} {data.lastName}
          </Typography>
        </>
      ) : null}
    </Paper>
  );
};
