import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import React from "react";
import { View } from "react-native";

const HomeComponent = () => {
  return (
    <View className="p-4">
      <CustomInput
        label="Nombre"
        value=""
        onChangeText={(text) => console.log(text)}
        placeholder="Ingrese su nombre"
      />

      <CustomSelect
        label="Seleccione una opción"
        selectedValue={null}
        onValueChange={(itemValue) => console.log(itemValue)}
        options={[
          { label: "Servicios", value: "1", id: "1" },
          { label: "Comercial", value: "2", id: "2" },
        ]}
      />
    </View>
  );
};

export default HomeComponent;
