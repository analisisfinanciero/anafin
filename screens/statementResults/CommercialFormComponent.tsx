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
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View className="p-6 mt-2">
              <CustomInput
                label="Ingresos a Crédito"
                placeholder="Ingrese los ingresos a crédito"
                keyboardType="numeric"
                value={values.creditIncome.toString()}
                onChangeText={(value) => {
                  parseFloat(value);
                  setFieldValue("creditIncome", value);
                  setFieldValue(
                    "grossSales",
                    (
                      parseFloat(value) +
                      parseFloat(values.cashIncome.toString())
                    ).toFixed(2)
                  );
                }}
                onBlur={handleBlur("creditIncome")}
              />
              <CustomInput
                label="Ingresos en Efectivo"
                placeholder="Ingrese los ingresos en efectivo"
                keyboardType="numeric"
                value={values.cashIncome.toString()}
                onChangeText={(value) => {
                  parseFloat(value);
                  setFieldValue("cashIncome", value);
                  setFieldValue(
                    "grossSales",
                    (
                      parseFloat(values.creditIncome.toString()) +
                      parseFloat(value)
                    ).toFixed(2)
                  );
                }}
                onBlur={handleBlur("cashIncome")}
              />
              <CustomInput
                label="Ventas Brutas"
                placeholder="Ingrese las ventas brutas"
                keyboardType="numeric"
                value={values.grossSales.toString()}
                onChangeText={handleChange("grossSales")}
                onBlur={handleBlur("grossSales")}
                editable={false}
              />

              <TouchableOpacity
                onPress={() => handleSubmit()}
                className="bg-blue-600 p-3 rounded-lg mt-4 shadow-lg"
              >
                <Text className="text-white text-center font-semibold">
                  {`Guardar ${date}`}
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
