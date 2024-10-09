import { useEditPatientMutation } from "../../../Common/apiSlice";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../Common/store";
import { openToast } from "../../../Common/toastSlice";
import { usePatientFormContext } from "./../Form/PatientFormContext";
import { PatientForm } from "./../Form/PatientForm";
import { Page } from "../../Layout/Page";
import { PatientNotFound } from "../PatientNotFound";

export const PatientEditPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, patientData, error } = usePatientFormContext();

  const [editPatientMutation] = useEditPatientMutation();

  return (
    <Page
      isLoading={isLoading}
      title="Edit Patient Profile"
      goBackRoute={patientData ? `/patients/${patientData.id}` : "/patients"}
      error={error}
    >
      {patientData ? (
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
      ) : (
        <PatientNotFound />
      )}
    </Page>
  );
};
