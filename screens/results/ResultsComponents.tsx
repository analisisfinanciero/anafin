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
    savingResult: false,
    deleteResult: false,
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
  }, [analyticsInformation]);

  useEffect(() => {
    setResultGenerated(null);
  }, [enterpriseInformation]);

  const getIAResults = async (email: string) => {
    setLoading({ ...loading, resultsList: true });
    ResultsService.getAllEarningsByUid(email)
      .then((response) => {
        const responseData: any[] = [];
        response.forEach((doc: any) => {
          responseData.push(doc.data());
        });
        setResultsList(responseData);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading({ ...loading, resultsList: false });
      });
  };

  const generateIAResults = async () => {
    setLoading({ ...loading, result: true });
    const verticalText = generateVerticalText(
      analyticsInformation?.verticalAnalytics
    );
    const horizontalText = generateHorizontalText(
      analyticsInformation?.horizontalAnalytics
    );
    const pasteText =
      "Resultados del análisis horizontal para el año 2022 - año 2023.\nlos ingresos disminuyeron en un 26,6% que corresponde a una disminución por valor de $ 370.00 En cuanto a los gastos estos se redujeron en un 44,2% equivalente a $ 170.00 La disminución mas representativa estuvo en los gastos de ventas con el 47,2% Los gastos financieros se redujeron en el 30% lo que corresponde a $ 720.00 y de igual manera se disminuyeron los ingresos extraordinarios en el 82,4% que corresponde a un decremento de $ 8000.00 La utilidad del ejercicio presenta un leve incremento del 9,6% que corresponde a $ 143.00";

    const result = {
      id: resultId,
      title: `Resultados de la empresa ${enterpriseInformation?.enterpriseName} NIT: ${enterpriseInformation?.enterpriseNIT}`,
      results: `Resultados de la empresa ${enterpriseInformation?.enterpriseName} NIT: ${enterpriseInformation?.enterpriseNIT}.\n\n${verticalText}\n${pasteText}.\n\n`,
      email: user?.email,
    };
    setTimeout(() => {
      setResultGenerated(result);
      setLoading({ ...loading, result: false });
    }, 5000);
    setResultGenerated(result);
  };

  const generateVerticalText = (verticalInformation: any) => {
    let text = "";
    if (enterpriseInformation?.enterpriseType === "service") {
      verticalInformation?.forEach((element: any) => {
        const introText = `Resultados del análisis vertical en el ${element.currentYear}.\n`;
        const netExpenses =
          element.operatingSalesExpenses +
          element.administrativeOperatingExpenses;
        const expensesTex =
          netExpenses > 0
            ? `Del cien por ciento de los ingresos, el ${netExpenses}% corresponden a los gastos operacionales del negocio.`
            : "En este periodo no se presentaron gastos operacionales.";

        const operatingProfitText = `Quedando una utilidad bruta operacional equivalente al ${element.operatingProfit}%.`;

        const netIncomeText =
          element.netIncome > 0
            ? `Con esta utilidad se cubren los otros gastos y el impuesto a la renta, quedando una utilidad positiva del ejercicio correspondiente al ${element.netIncome}%.`
            : `Con esta utilidad se cubren los otros gastos y el impuesto a la renta, quedando una utilidad negativa del ejercicio correspondiente al ${element.netIncome}%.`;

        text += `${introText}${expensesTex} ${operatingProfitText} ${netIncomeText}\n\n`;
      });
    } else {
      verticalInformation?.forEach((element: any) => {
        const introText = `Resultados del análisis vertical en el ${element.currentYear}.\n`;
        const netSalesText = `Del cien por ciento de las ventas, teniendo en cuenta las devoluciones y los descuentos el ${element.netSales}% corresponde a las ventas netas.`;
        const costOfSalesText = `El costo de ventas corresponde al ${element.costOfSales}%.`;
        const grossOperatingIncomeText = `Quedando una utilidad bruta operacional equivalente al ${element.grossOperatingIncome}%.`;
        const operatingProfitText = `Con lo cual se absorben los gastos operacionales para obtener una utilidad operacional del ${element.operatingProfit}.`;
        const netIncomeText =
          element.netIncome > 0
            ? `Con esta utilidad se cubren los gastos financieros y extraordinarios, y el impuesto a la renta quedando una utilidad positiva del ejercicio correspondiente al ${element.netIncome}%.`
            : `Con esta utilidad se cubren los gastos financieros y extraordinarios, y el impuesto a la renta quedando una utilidad negativa del ejercicio correspondiente al ${element.netIncome}%.`;
        text += `${introText}${netSalesText} ${costOfSalesText} ${grossOperatingIncomeText} ${operatingProfitText} ${netIncomeText}\n\n`;
      });
    }
    return text;
  };

  const generateHorizontalText = (horizontalInformation: any) => {
    let text = "";
    if (enterpriseInformation?.enterpriseType === "service") {
      horizontalInformation?.forEach((element: any) => {
        console.log("horizontalInformation", element);

        const introText = `Resultados del análisis horizontal en el ${element.currentYear}.\n`;
        const netIncomeText = `La utilidad del ejercicio en el año ${element.currentYear}.Fue de ${element.netIncome}.`;
        const netIncomeLastYearText = `La utilidad del ejercicio en el año ${element.lastYear} fue de ${element.netIncomeLastYear}.`;
        const netIncomeVariationText = `La variación de la utilidad del ejercicio en el año ${element.currentYear} con respecto al año ${element.lastYear} fue del ${element.netIncomeVariation}%.`;
        text += `${introText}${netIncomeText} ${netIncomeLastYearText} ${netIncomeVariationText}\n\n`;
      });
    } else {
    }
    return text;
  };

  const handleSaveResult = () => {
    setLoading({ ...loading, savingResult: true });
    ResultsService.insertResults(resultGenerated)
      .then((response) => {
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
        console.error(error);
      })
      .finally(() => {
        setLoading({ ...loading, savingResult: false });
      });
  };

  const handleDeleteResult = (id: string) => {
    setLoading({ ...loading, deleteResult: true });
    ResultsService.deleteResult(id)
      .then(() => {
        getIAResults(user?.email ?? "");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading({ ...loading, deleteResult: false });
      });
  };

  return (
    <View className="p-4">
      {!isAvailable && (
        <CustomAlertInformative
          isVisible={true}
          type="error"
          message={`Primero verifica los análisis Horizontales y verticales generados en "Análisis". Asegúrate de que la información este correctamente diligenciada.`}
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
          {loading.result ? (
            <Spinner />
          ) : (
            resultGenerated && (
              <ResultsForm
                key={resultGenerated.id}
                title={resultGenerated.title}
                resultContent={resultGenerated.results}
                isNew={true}
                OnPressButton={handleSaveResult}
                disabledButton={
                  user?.id === "usuarioIncognito" || loading.savingResult
                }
              />
            )
          )}
          {loading.savingResult || loading.resultsList ? (
            <Spinner />
          ) : (
            <CustomFormButton
              onPressFunction={generateIAResults}
              textButton={"Generar resultados con IA"}
            />
          )}
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
              disabledButton={loading.deleteResult}
            />
          ))}
      </View>
    </View>
  );
};

export default ResultsComponents;
