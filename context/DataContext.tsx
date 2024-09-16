import { DataInformation } from "@/classes/dataClasses/DataClass";
import { ChildrenProps } from "@/interfaces/authInterfaces/AuthContextProps";
import {
  DataContextInterface,
  DataInformationInterface,
  EnterpriseInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";
import { createContext, useContext, useMemo, useState } from "react";

const initialValue: DataContextInterface = {
  enterpriseInformation: null,
  dataInformation: null,
  handleSetEnterpriseInformation: () => {},
};

export const DataContext = createContext<DataContextInterface>(initialValue);

export const DataContextProvider = ({ children }: ChildrenProps) => {
  const [enterpriseInformation, setEnterpriseInformation] =
    useState<EnterpriseInformationInterface | null>(null);

  const [dataInformation, setDataInformation] =
    useState<DataInformationInterface | null>(null);

  const handleSetEnterpriseInformation = (
    enterpriseInformation: EnterpriseInformationInterface
  ) => {
    setEnterpriseInformation(enterpriseInformation);
    const dataInformationValue = new DataInformation(
      enterpriseInformation.years,
      enterpriseInformation.enterpriseType
    );
    setDataInformation(dataInformationValue);
  };
  
  const contextValue = useMemo(
    () => ({
      enterpriseInformation,
      dataInformation,
      handleSetEnterpriseInformation,
    }),
    [enterpriseInformation, dataInformation, handleSetEnterpriseInformation]
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
