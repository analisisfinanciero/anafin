import AlertComponent from "@/components/AlertComponent";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

const StatementResultsComponent = () => {
  const { enterpriseInformation } = useDataContext();
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
    </View>
  );
};

export default StatementResultsComponent;
