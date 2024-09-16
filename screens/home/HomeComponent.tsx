import { EnterpriseInformation } from "@/classes/dataClasses/DataClass";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { EnterpriseInformationInterface } from "@/interfaces/dataInterfaces/DataContextProps";
import React, { useState } from "react";
import { View } from "react-native";

const HomeComponent = () => {
  const initialValue = new EnterpriseInformation();
  const [enterpriseInformation, setEnterpriseInformation] =
    useState<EnterpriseInformationInterface>(initialValue);

  const handleChangeName = (text: string) => {
    setEnterpriseInformation({
      ...enterpriseInformation,
      enterpriseName: text,
    });
  };

  const handleChangeType = (itemValue: string) => {
    const enterpriseType = itemValue as "" | "service" | "commercial";
    setEnterpriseInformation({
      ...enterpriseInformation,
      enterpriseType: enterpriseType,
    });
  };

  const handleChangeYears = (text: string) => {
    setEnterpriseInformation({
      ...enterpriseInformation,
      years: parseInt(text),
    });
  };

  return (
    <View className="p-4">
      <CustomInput
        label="Nombre de la empresa"
        value={enterpriseInformation.enterpriseName}
        onChangeText={handleChangeName}
        placeholder="Ingrese el nombre de la empresa"
      />

      <CustomSelect
        label="Seleccione una opción"
        selectedValue={null}
        onValueChange={handleChangeType}
        options={[
          { label: "Actividad de servicios", value: "service", id: "1" },
          { label: "Actividad comercial", value: "commercial", id: "2" },
        ]}
      />

      <CustomInput
        label="Años de operación"
        value={enterpriseInformation.years.toString()}
        onChangeText={handleChangeYears}
        placeholder="Ingrese los años de operación"
      />
    </View>
  );
};

export default HomeComponent;
