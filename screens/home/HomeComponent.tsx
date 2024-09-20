import React from "react";
import { Text, View } from "react-native";
import { Formik } from "formik";

import CustomFormButton from "@/components/CustomFormButton";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { EnterpriseInformation } from "@/classes/dataClasses/DataClass";
import { InitialValuesValidationSchema } from "@/schemas/InitialValuesValidationSchema";

const activityOptions = [
  { label: "Actividad de servicios", value: "service", id: "1" },
  { label: "Actividad comercial", value: "commercial", id: "2" },
];

const HomeComponent = () => {
  const initialValue = new EnterpriseInformation();

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={InitialValuesValidationSchema}
      onSubmit={(values) => console.log("values", values)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid
      }) => (
        <View className="p-4">
          <CustomInput
            label="Nombre de la empresa"
            value={values.enterpriseName}
            onChangeText={handleChange("enterpriseName")}
            placeholder="Ingrese el nombre de la empresa"
            onBlur={handleBlur("enterpriseName")}
          />
          {errors.enterpriseName && touched.enterpriseName && (
            <Text className="text-red-600 mb-3">{errors.enterpriseName}</Text>
          )}
          <CustomSelect
            label="Seleccione una opción"
            selectedValue={
              activityOptions.find(
                (item) => item.value === values.enterpriseType
              )?.label ?? null
            }
            onValueChange={handleChange("enterpriseType")}
            options={activityOptions}
          />
          {errors.enterpriseType && touched.enterpriseType && (
            <Text className="text-red-600 mb-3">{errors.enterpriseType}</Text>
          )}
          <CustomInput
            label="Años de información"
            value={values.years != 0 ? values.years.toString() : ""}
            onChangeText={handleChange("years")}
            onBlur={handleBlur("years")}
            placeholder="Ingrese los años de información"
            keyboardType="numeric"
          />
          {errors.years && touched.years && (
            <Text className="text-red-600 mb-3">{errors.years}</Text>
          )}
          <CustomFormButton
            onPressFunction={handleSubmit}
            textButton="Guardar información"
            isDisabled={!isValid}
          />
        </View>
      )}
    </Formik>
  );
};

export default HomeComponent;
