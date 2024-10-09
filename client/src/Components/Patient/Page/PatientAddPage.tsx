import { useAddPatientMutation } from "../../../Common/apiSlice";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Common/store";
import { openToast } from "../../../Common/toastSlice";
import { PatientForm } from "./../Form/PatientForm";
import { Page } from "../../Layout/Page";
import { usePatientFormContext } from "./../Form/PatientFormContext";

export const PatientAddPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [addPatientMutation] = useAddPatientMutation();
  const { patientData } = usePatientFormContext();

  return (
    <Page title="Add Patient Profile" goBackRoute="/patients">
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
                title: "Patient profile added",
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
