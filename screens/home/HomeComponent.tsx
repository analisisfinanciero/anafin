import React, {  useState } from "react";
import {  Keyboard, Text, View } from "react-native";
import { Formik } from "formik";

import CustomFormButton from "@/components/CustomFormButton";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { EnterpriseInformation } from "@/classes/dataClasses/DataClass";
import { InitialValuesValidationSchema } from "@/schemas/InitialValuesValidationSchema";
import { useDataContext } from "@/context/DataContext";
import AlertComponent from "@/components/AlertComponent";

const activityOptions = [
  { label: "Actividad de servicios", value: "service", id: "1" },
  { label: "Actividad comercial", value: "commercial", id: "2" },
];

const HomeComponent = () => {
  const [initialValues, setInitialValues] = useState<EnterpriseInformation>(
    new EnterpriseInformation()
  );
  const [isVisible, setIsVisible] = useState(false);
  const { enterpriseInformation, handleSetEnterpriseInformation } =
    useDataContext();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={InitialValuesValidationSchema}
      onSubmit={(values) => {
        const newEnterpriseInformation = new EnterpriseInformation(values);
        handleSetEnterpriseInformation(newEnterpriseInformation);
        setInitialValues(newEnterpriseInformation);
        Keyboard.dismiss();
        setIsVisible(true);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View className="p-4">
          {enterpriseInformation?.enterpriseName && (
            <AlertComponent
              isVisible={isVisible}
              type="info"
              message="El estado de resultados se ha generado correctamente, dirígete a la pestaña de datos. cualquier modificación que realices en este formulario modificará la información del estado de resultados, para habilitar el formulario nuevamente cierra este mensaje."
              onDismiss={() => setIsVisible(false)}
            />
          )}
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
            textButton="Generar estado de resultados"
            isDisabled={!isValid || isVisible}
          />
        </View>
      )}
    </Formik>
  );
};

export default HomeComponent;
