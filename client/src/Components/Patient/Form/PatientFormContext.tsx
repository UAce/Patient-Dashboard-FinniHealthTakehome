import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { Patient } from "../../../Common/apiSlice";

export type PatientFormContextValue = {
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
  const [patientData, setPatientData] = useState<Partial<Patient> | null>(null);

  const value = useMemo(
    () => ({
      patientData,
      setPatientData,
    }),
    [patientData, setPatientData]
  );

  return (
    <PatientFormContext.Provider value={value}>
      {children}
    </PatientFormContext.Provider>
  );
};
