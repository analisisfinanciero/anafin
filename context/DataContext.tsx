import { ChildrenProps } from "@/interfaces/authInterfaces/AuthContextProps";
import {
  DataContextInterface,
  EnterpriseInformation,
} from "@/interfaces/dataInterfaces/DataContextProps";
import { createContext, useContext, useMemo, useState } from "react";

const initialValue: DataContextInterface = {
  enterpriseInformation: null,
  setEnterpriseInformation: () => {},
};

export const DataContext = createContext<DataContextInterface>(initialValue);

export const DataContextProvider = ({ children }: ChildrenProps) => {
  const [enterpriseInformation, setEnterpriseInformation] =
    useState<EnterpriseInformation | null>(null);

  const contextValue = useMemo(
    () => ({ enterpriseInformation, setEnterpriseInformation }),
    [enterpriseInformation, setEnterpriseInformation]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    console.error("Debes estar dentro del contexto de DataContext");
  }
  return context;
};
