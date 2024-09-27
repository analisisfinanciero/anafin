import { ServiceInformation } from "@/classes/dataClasses/DataClass";
import CustomInput from "@/components/CustomInput";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CommercialFormComponentProps {
  date: string;
}

const CommercialFormComponent: React.FC<CommercialFormComponentProps> = ({
  date,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialValues, setInitialValues] = useState<ServiceInformation>(
    new ServiceInformation(date)
  );

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="mb-4">
      {/* Botón de acordeón con íconos */}
      <TouchableOpacity
        onPress={toggleExpand}
        className="flex flex-row items-center justify-between bg-gray-200 p-4 rounded-lg shadow-md"
      >
        <Text className="text-lg font-bold">
          {date} - {isExpanded ? "Ocultar" : "Mostrar"} Formulario
        </Text>
        {isExpanded ? <Text>{`<`}</Text> : <Text>{`>`}</Text>}
      </TouchableOpacity>

      {/* Contenido expandible */}
      {isExpanded && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Formulario guardado:", values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className="p-6 bg-gray-100 rounded-lg mt-2 shadow-sm">
              <Text className="font-bold mb-4 text-center">
                Formulario Comercial {date}
              </Text>

              <CustomInput
                label="Ventas Brutas"
                placeholder="Ingrese las ventas brutas"
                value={values.grossSales.toString()}
                onChangeText={handleChange("grossSales")}
                onBlur={handleBlur("grossSales")}
              />

              <CustomInput
                label="Ingresos a Crédito"
                placeholder="Ingrese los ingresos a crédito"
                value={values.creditIncome.toString()}
                onChangeText={handleChange("creditIncome")}
                onBlur={handleBlur("creditIncome")}
              />

              <CustomInput
                label="Ingresos en Efectivo"
                placeholder="Ingrese los ingresos en efectivo"
                value={values.cashIncome.toString()}
                onChangeText={handleChange("cashIncome")}
                onBlur={handleBlur("cashIncome")}
              />

              {/* Campo calculado no editable */}
              <CustomInput
                label="Ventas Netas"
                placeholder="Ventas Netas"
                value={(
                  parseFloat(values.creditIncome.toString()) +
                  parseFloat(values.cashIncome.toString())
                ).toFixed(2)}
                onChangeText={() => {}}
                // editable={false} // Deshabilitado porque es un campo calculado
              />

              {/* Botón para guardar */}
              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-blue-600 p-3 rounded-lg mt-4 shadow-lg"
              >
                <Text className="text-white text-center font-semibold">
                  Guardar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      )}
    </View>
  );
};

export default CommercialFormComponent;
