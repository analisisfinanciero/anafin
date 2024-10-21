import CustomAlertInformative from "@/components/CustomAlertInformative";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { View } from "react-native";

const ResultsComponents = () => {
  const { analyticsInformation } = useDataContext();

  return (
    <View>
      {!analyticsInformation?.hasData && (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Primero verifica los análisis Horizontales y verticales generados en "Análisis".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}
    </View>
  );
};

export default ResultsComponents;
