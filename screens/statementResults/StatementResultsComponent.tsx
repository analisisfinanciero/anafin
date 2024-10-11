import { useDataContext } from "@/context/DataContext";
import React from "react";
import { Alert, View } from "react-native";
import ServiceFormComponent from "./ServiceFormComponent";
import CommercialFormComponent from "./CommercialFormComponent";
import CustomAlertInformative from "@/components/CustomAlertInformative";
import {
  CommercialInformationInterface,
  ServiceInformationInterface,
} from "@/interfaces/dataInterfaces/DataContextProps";

const StatementResultsComponent = () => {
  const { enterpriseInformation, dataInformation, handleSetDataInformation } =
    useDataContext();

  const dataInformationValue = dataInformation?.dataInformation;

  const handleSetDataInformationByYear = (
    year: string,
    values: Array<ServiceInformationInterface | CommercialInformationInterface>
  ) => {
    const newValues = dataInformation?.dataInformation?.map((element) => {
      if (element.currentYear === year) {
        return values;
      } else {
        return element;
      }
    });
    handleSetDataInformation({
      hasData: true,
      dataInformation: newValues as Array<
        ServiceInformationInterface | CommercialInformationInterface
      >,
    });
    Alert.alert(
      `Guardado exitoso`,
      `La información del ${year} ha sido guardada`,
      [
        {
          text: "Aceptar",
          onPress: () => {},
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="p-4">
      {enterpriseInformation === null ? (
        <CustomAlertInformative
          isVisible={enterpriseInformation === null}
          type="error"
          message={`Ingresa lo datos básicos de la empresa en "Inicio".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      ) : (
        <CustomAlertInformative
          isVisible={enterpriseInformation !== null}
          type="info"
          message={`Guarda la información de cada año para continuar con los análisis.`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}

      {dataInformationValue?.map((elementByYear) =>
        enterpriseInformation?.enterpriseType === "service" ? (
          <ServiceFormComponent
            key={elementByYear?.currentYear}
            date={elementByYear?.currentYear}
            onSubmit={handleSetDataInformationByYear}
          />
        ) : (
          <CommercialFormComponent
            key={elementByYear?.currentYear}
            date={elementByYear?.currentYear}
            onSubmit={handleSetDataInformationByYear}
          />
        )
      )}
    </View>
  );
};

export default StatementResultsComponent;
