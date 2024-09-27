import AlertComponent from "@/components/AlertComponent";
import { useDataContext } from "@/context/DataContext";
import React, { useState } from "react";
import { View } from "react-native";
import ServiceFormComponent from "./ServiceFormComponent";
import CommercialFormComponent from "./CommercialFormComponent";

const StatementResultsComponent = () => {
  const { enterpriseInformation, dataInformation } = useDataContext();
  const [isVisible, setIsVisible] = useState(enterpriseInformation === null);

  return (
    <View className="p-4">
      {enterpriseInformation === null && (
        <AlertComponent
          isVisible={isVisible}
          type="error"
          message="Para poder generar un estado de resultados primero debes ingresar lo datos básicos de la empresa en la pestaña de inicio."
          onDismiss={() => setIsVisible(false)}
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
