import CustomAlertInformative from "@/components/CustomAlertInformative";
import React from "react";
import { View } from "react-native";

const AnalyticsComponent = () => {
  return (
    <View className="p-4">
      <CustomAlertInformative
        isVisible={true}
        type="error"
        message={`Ingresa los estados de resultados en "Datos".`}
        isCloseable={false}
        onDismiss={() => {}}
      />
    </View>
  );
};

export default AnalyticsComponent;
