import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { IntakeStatus } from "../../Common/apiSlice";
import { useSearchParams } from "react-router-dom";

export type PatientListContextValue = {
  search: string;
  onSearch: (search: string) => void;
  selectedStatuses: IntakeStatus[];
  onSelectedStatusesChange: (statuses: IntakeStatus[]) => void;
  onClearFilters: () => void;
};

const PatientListContext = createContext<PatientListContextValue | undefined>(
  undefined
);

export const usePatientListContext = () => {
  const context = useContext(PatientListContext);
  if (!context) {
    throw new Error(
      "usePatientListContext must be used within a PatientListContextProvider"
    );
  }
  return context;
};

export const PatientListContextProvider = ({ children }: PropsWithChildren) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedStatuses = useMemo(
    () => (searchParams.getAll("status") as IntakeStatus[]) ?? [],
    [searchParams]
  );
  const search = searchParams.get("search") || "";

  const onSearch = useCallback(
    (nextSearch: string) => {
      // Persist the search in the URL
      const newSearchParams = new URLSearchParams(searchParams);
      if (nextSearch === "") {
        newSearchParams.delete("search");
      } else {
        newSearchParams.set("search", nextSearch);
      }

      setSearchParams(newSearchParams);
    },
    [setSearchParams, searchParams]
  );

  const onSelectedStatusesChange = useCallback(
    (nextStatus: IntakeStatus[]) => {
      searchParams.delete("status");

      const newSearchParams = new URLSearchParams(searchParams);
      nextStatus.forEach((status) => {
        newSearchParams.append("status", status);
      });

      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams]
  );

  const onClearFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("status");
    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  const value = useMemo(
    () => ({
      search,
      onSearch,
      selectedStatuses,
      onSelectedStatusesChange,
      onClearFilters,
    }),
    [
      search,
      onSearch,
      selectedStatuses,
      onSelectedStatusesChange,
      onClearFilters,
    ]
  );

  return (
    <PatientListContext.Provider value={value}>
      {children}
    </PatientListContext.Provider>
  );
};
