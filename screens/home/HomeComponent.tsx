import { EnterpriseInformation } from "@/classes/dataClasses/DataClass";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { EnterpriseInformationInterface } from "@/interfaces/dataInterfaces/DataContextProps";
import React, { useState } from "react";
import { View } from "react-native";
import { Formik } from "formik";
import CustomFormButton from "@/components/CustomFormButton";

const activityOptions = [
  { label: "Actividad de servicios", value: "service", id: "1" },
  { label: "Actividad comercial", value: "commercial", id: "2" },
];

const HomeComponent = () => {
  const initialValue = new EnterpriseInformation();

  const validateDisabled = (values: EnterpriseInformationInterface) => {
    return (
      values.enterpriseName === "" ||
      values.enterpriseType === null ||
      values.years === 0
    );
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(values) => console.log("values", values)}
    >
      {({ handleChange, handleSubmit, values }) => (
        <View className="p-4">
          <CustomInput
            label="Nombre de la empresa"
            value={values.enterpriseName}
            onChangeText={handleChange("enterpriseName")}
            placeholder="Ingrese el nombre de la empresa"
          />

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

          <CustomInput
            label="Años de operación"
            value={values.years.toString()}
            onChangeText={handleChange("years")}
            placeholder="Ingrese los años de operación"
            keyboardType="numeric"
          />

          <CustomFormButton
            onPressFunction={handleSubmit}
            textButton="Guardar información"
            isDisabled={validateDisabled(values)}
          />
        </View>
      )}
    </Formik>
  );
};

export default HomeComponent;
