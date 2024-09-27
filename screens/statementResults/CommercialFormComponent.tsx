import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Formik } from "formik";
import { ServiceInformation } from "@/classes/dataClasses/DataClass";
import CustomAccordion from "@/components/CustomAccordion";
import CustomInput from "@/components/CustomInput";

interface CommercialFormComponentProps {
  date: string;
}

const CommercialFormComponent: React.FC<CommercialFormComponentProps> = ({
  date,
}) => {
  const [initialValues, setInitialValues] = useState<ServiceInformation>(
    new ServiceInformation(date)
  );

  return (
    <View>
      <CustomAccordion title={`Formulario del ${date}`}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            console.log("Formulario guardado:", values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View className="p-6 mt-2">
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
                editable={false} // Deshabilitado porque es un campo calculado
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
      </CustomAccordion>
    </View>
  );
};

export default CommercialFormComponent;
