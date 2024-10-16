import { VerticalAnalyticsClassByYear } from "@/classes/analyticsClass/VerticalAnalyticsClass";
import CustomAlertInformative from "@/components/CustomAlertInformative";
import { useDataContext } from "@/context/DataContext";

import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ServiceFormComponent from "../statementResults/ServiceFormComponent";
import CommercialFormComponent from "../statementResults/CommercialFormComponent";

const AnalyticsComponent = () => {
  const [verticalAnalysis, setVerticalAnalysis] = useState<any>([]);
  const { enterpriseInformation, dataInformation } = useDataContext();

  useEffect(() => {
    if (dataInformation?.hasData) {
      getVerticalAnalysis();
    }
  }, [dataInformation]);

  const getVerticalAnalysis = () => {
    const verticalAnalysisArray = dataInformation?.dataInformation?.map(
      (dataByYear) => {
        return new VerticalAnalyticsClassByYear(
          dataByYear,
          enterpriseInformation?.enterpriseType ?? null
        ).generateVerticalAnalysis();
      }
    );
    setVerticalAnalysis(verticalAnalysisArray);
  };

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

      {dataInformation?.hasData &&
        verticalAnalysis.length > 0 &&
        verticalAnalysis.map((elementByYear: any) =>
          enterpriseInformation?.enterpriseType === "service" ? (
            <ServiceFormComponent
              key={elementByYear?.currentYear}
              title={`Análisis vertical ${elementByYear?.currentYear}`}
              date={elementByYear?.currentYear}
              initialData={elementByYear}
              editableForm={false}
              percentageValues={true}
              onSubmit={() => {}}
            />
          ) : (
            <CommercialFormComponent
              key={elementByYear?.currentYear}
              title={`Análisis vertical ${elementByYear?.currentYear}`}
              date={elementByYear?.currentYear}
              initialData={elementByYear}
              editableForm={false}
              percentageValues={true}
              onSubmit={() => {}}
            />
          )
        )}
    </View>
  );
};

export default AnalyticsComponent;
