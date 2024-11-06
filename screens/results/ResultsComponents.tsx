import CustomAlertInformative from "@/components/CustomAlertInformative";
import CustomFormButton from "@/components/CustomFormButton";
import { useDataContext } from "@/context/DataContext";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import ResultsService from "../../service/results/ResultsService";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/Spinner";
import Empty from "@/components/Empty";
import ResultsForm from "./ResultsForm";
import uuid from "react-native-uuid";

const ResultsComponents = () => {
  const { analyticsInformation } = useDataContext();
  const { user } = useAuth();
  const { enterpriseInformation } = useDataContext();

  const [showSessionAlert, setShowSessionAlert] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [resultGenerated, setResultGenerated] = useState<any>(null);
  const [resultsList, setResultsList] = useState<any[]>([]);

  const [loading, setLoading] = useState({
    result: false,
    resultsList: false,
  });

  let resultId = uuid.v4();

  useEffect(() => {
    if (
      analyticsInformation?.hasData &&
      analyticsInformation?.horizontalAnalytics &&
      analyticsInformation?.verticalAnalytics
    ) {
      setIsAvailable(true);
    }
    if (user?.id !== "usuarioIncognito") {
      getIAResults(user?.email ?? "");
    } else {
      setShowSessionAlert(true);
    }
  }, []);

  const getIAResults = async (email: string) => {
    setLoading({ ...loading, resultsList: true });
    ResultsService.getAllEarningsByUid(email)
      .then((response) => {
        const responseData: any[] = [];
        response.forEach((doc) => {
          responseData.push(doc.data());
        });
        setResultsList(responseData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading({ ...loading, resultsList: false });
      });
  };

  const generateIAResults = async () => {
    const result = {
      id: resultId,
      title: `Resultados de la empresa ${enterpriseInformation?.enterpriseName} NIT: ${enterpriseInformation?.enterpriseNIT}`,
      results: "Resultados de IA",
      email: user?.email,
    };
    setResultGenerated(result);
  };

  const handleSaveResult = () => {
    ResultsService.insertResults(resultGenerated)
      .then((response) => {
        console.log(response);
        if (response?.id) {
          getIAResults(user?.email ?? "");
          Alert.alert(
            `Guardado exitoso`,
            `El resultado ha sido guardado`,
            [
              {
                text: "Aceptar",
                onPress: () => {},
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteResult = (id: string) => {
    ResultsService.deleteResult(id)
      .then(() => {
        getIAResults(user?.email ?? "");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View className="p-4">
      {!analyticsInformation?.hasData && (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Primero verifica los análisis Horizontales y verticales generados en "Análisis".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}
      {isAvailable && (
        <CustomAlertInformative
          isVisible={isAvailable}
          type="info"
          message={`Presione el botón de "Generar resultados con IA" para obtener un análisis de los resultados obtenidos.`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}
      {showSessionAlert && (
        <CustomAlertInformative
          isVisible={showSessionAlert}
          type="info"
          message={`Para ver el historial de resultados, inicia sesión en "Opciones".`}
          isCloseable={false}
          onDismiss={() => {}}
        />
      )}

      {isAvailable && (
        <View className="border-b border-neutral-200 mb-2">
          <Text className="text-[18px] font-bold mb-4 self-center">
            Nuevo resultado
          </Text>
          {resultGenerated && (
            <ResultsForm
              key={resultGenerated.id}
              title={resultGenerated.title}
              resultContent={resultGenerated.results}
              isNew={true}
              OnPressButton={handleSaveResult}
              disabledButton={user?.id === "usuarioIncognito"}
            />
          )}
          <CustomFormButton
            onPressFunction={generateIAResults}
            textButton={"Generar resultados con IA"}
          />
        </View>
      )}
      <View className="mb-2 mt-10">
        <Text className="text-[18px] font-bold mb-4 self-center">
          Historial de resultados
        </Text>
        {loading.resultsList && <Spinner />}
        {!loading.resultsList && resultsList.length === 0 && <Empty />}
        {!loading.resultsList &&
          resultsList.length > 0 &&
          resultsList.map((result) => (
            <ResultsForm
              key={result.id}
              isNew={false}
              title={result.title}
              resultContent={result.results}
              OnPressButton={() => handleDeleteResult(result.id)}
            />
          ))}
      </View>
    </View>
  );
};

export default ResultsComponents;
