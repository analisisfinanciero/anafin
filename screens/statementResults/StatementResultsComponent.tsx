import { useDataContext } from "@/context/DataContext";
import React from "react";
import { View } from "react-native";
import ServiceFormComponent from "./ServiceFormComponent";
import CommercialFormComponent from "./CommercialFormComponent";
import CustomAlertInformative from "@/components/CustomAlertInformative";

const StatementResultsComponent = () => {
  const { enterpriseInformation, dataInformation } = useDataContext();

  return (
    <View className="p-4">
      {enterpriseInformation === null && (
        <CustomAlertInformative
          isVisible={enterpriseInformation === null}
          type="error"
          message="Para poder generar un estado de resultados primero debes ingresar lo datos básicos de la empresa en la pestaña de inicio."
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}
      {dataInformation?.dataInformation?.map((elementByYear, index) =>
        enterpriseInformation?.enterpriseType === "service" ? (
          <ServiceFormComponent
            key={elementByYear?.currentYear}
            date={elementByYear?.currentYear}
          />
        ) : (
          <CommercialFormComponent
            key={elementByYear?.currentYear}
            date={elementByYear?.currentYear}
          />
        )
      )}
    </View>
  );
};

export default StatementResultsComponent;
