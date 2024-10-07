import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useAddPatientMutation } from "../../Common/apiSlice";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Common/store";
import { openToast } from "../../Common/toastSlice";
import { PatientForm } from "./Form/PatientForm";
import { Page } from "../Page";
import { usePatientFormContext } from "./Form/PatientFormContext";

export const PatientAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [addPatientMutation] = useAddPatientMutation();
  const { patientData } = usePatientFormContext();

  return (
    <Page>
      <Stack flexDirection="row" sx={{ alignItems: "center" }} columnGap={1}>
        <IconButton onClick={() => navigate(`/patients`)}>
          <ArrowBack fontSize="large" />
        </IconButton>
        <Typography variant="h5">Add Patient Profile</Typography>
      </Stack>
      <Divider />
      <PatientForm
        action="Add"
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          try {
            const patient = await addPatientMutation({
              ...patientData,
            }).unwrap();
            dispatch(
              openToast({
                severity: "success",
                title: "Patient profile added!",
              })
            );
            navigate(`/patients/${patient.id}`);
          } catch (error) {
            console.error(error);
            dispatch(
              openToast({
                severity: "error",
                title: "Error adding patient profile",
              })
            );
          }
        }}
      />
    </Page>
  );
};
