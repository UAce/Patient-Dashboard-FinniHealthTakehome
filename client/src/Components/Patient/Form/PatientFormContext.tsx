import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AddressType,
  IntakeStatus,
  Patient,
  useGetPatientByIdQuery,
} from "../../../Common/apiSlice";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";

export type PatientFormContextValue = {
  isLoading: boolean;
  patientData: Partial<Patient> | null;
  setPatientData: Dispatch<React.SetStateAction<Partial<Patient> | null>>;
};

const PatientFormContext = createContext<PatientFormContextValue | undefined>(
  undefined
);

export const usePatientFormContext = () => {
  const context = useContext(PatientFormContext);
  if (!context) {
    throw new Error(
      "usePatientFormContext must be used within a PatientFormContextProvider"
    );
  }
  return context;
};

export const PatientFormContextProvider = ({ children }: PropsWithChildren) => {
  const { id } = useParams();
  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);
  const [patientData, setPatientData] = useState<Partial<Patient> | null>(
    isLoading
      ? null
      : data || {
          status: IntakeStatus.Inquiry,
          addresses: [
            {
              type: AddressType.Primary,
              line1: "",
              line2: "",
              city: "",
              area: "",
              country: "",
              postalCode: "",
            },
          ],
        }
  );

  useEffect(() => {
    if (data) {
      setPatientData(data);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      isLoading,
      patientData,
      setPatientData,
    }),
    [isLoading, patientData, setPatientData]
  );

  return (
    <PatientFormContext.Provider value={value}>
      {children}
    </PatientFormContext.Provider>
  );
};
