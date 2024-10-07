import { Divider, IconButton, Stack, Typography } from "@mui/material";
import {
  updatableFields,
  useEditPatientMutation,
  useGetPatientByIdQuery,
} from "../../Common/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { ArrowBack } from "@mui/icons-material";
import { FormEvent, useEffect } from "react";
import { pick } from "lodash";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Common/store";
import { openToast } from "../../Common/toastSlice";
import { usePatientFormContext } from "./Form/PatientFormContext";
import { PatientForm } from "./Form/PatientForm";
import { Page } from "../Page";

export const PatientEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { patientData, setPatientData } = usePatientFormContext();

  const [editPatientMutation] = useEditPatientMutation();
  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);

  useEffect(() => {
    if (data) {
      setPatientData({
        id: data.id,
        ...pick(data, updatableFields),
      });
    }
  }, [data, setPatientData]);

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
                    title: "Patient profile saved!",
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
