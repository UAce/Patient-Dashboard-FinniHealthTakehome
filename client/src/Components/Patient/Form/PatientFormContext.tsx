import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
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
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type PatientFormContextValue = {
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  isTouched: boolean;
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
  const { isLoading, data, error } = useGetPatientByIdQuery(
    id ? id : skipToken
  );
  const [isTouched, setIsTouched] = useState(false);
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

  const wrappedSetPatientData = useCallback(
    (data: SetStateAction<Partial<Patient> | null>) => {
      setIsTouched(true);
      setPatientData(data);
    },
    []
  );

  useEffect(() => {
    if (data) {
      setPatientData(data);
    }
  }, [data]);

  const value = useMemo(
    () => ({
      error,
      isTouched,
      isLoading,
      patientData,
      setPatientData: wrappedSetPatientData,
    }),
    [error, isTouched, isLoading, patientData, wrappedSetPatientData]
  );

  return (
    <PatientFormContext.Provider value={value}>
      {children}
    </PatientFormContext.Provider>
  );
};
