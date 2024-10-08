import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useEditPatientMutation } from "../../Common/apiSlice";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Common/store";
import { openToast } from "../../Common/toastSlice";
import { usePatientFormContext } from "./Form/PatientFormContext";
import { PatientForm } from "./Form/PatientForm";
import { Page } from "../Page";

export const PatientEditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, patientData } = usePatientFormContext();

  const [editPatientMutation] = useEditPatientMutation();

  return (
    <Page isLoading={isLoading}>
      {patientData ? (
        <>
          <Stack
            flexDirection="row"
            sx={{ alignItems: "center" }}
            columnGap={1}
          >
            <IconButton onClick={() => navigate(`/patients/${patientData.id}`)}>
              <ArrowBack fontSize="large" />
            </IconButton>
            <Typography variant="h5">Edit Patient Profile</Typography>
          </Stack>
          <Divider />
          <PatientForm
            action="Save"
            onSubmit={async (event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              try {
                await editPatientMutation({
                  id: patientData.id,
                  ...patientData,
                }).unwrap();
                dispatch(
                  openToast({
                    severity: "success",
                    title: "Patient profile saved",
                  })
                );
              } catch (error) {
                console.error(error);
                dispatch(
                  openToast({
                    severity: "error",
                    title: "Error saving patient profile",
                  })
                );
              }
            }}
          />
        </>
      ) : null}
    </Page>
  );
};
