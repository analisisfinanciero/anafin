import CustomAlertInformative from "@/components/CustomAlertInformative";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { View } from "react-native";

const AnalyticsComponent = () => {
  const { dataInformation } = useDataContext();

  return (
    <View className="p-4">
      {dataInformation?.hasData ? (
        <CustomAlertInformative
          isVisible={true}
          type="info"
          message={`Los años NO guardados, también serán tomados en cuenta para el análisis.`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      ) : (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Ingresa los estados de resultados en "Datos".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}
    </View>
  );
};

export default AnalyticsComponent;
