import CustomFormButton from "@/components/CustomFormButton";
import { useAuth } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { View, Text, Image } from "react-native";

const ConfigurationsComponent = () => {
  const { user, logout } = useAuth();
  const { clearInformation } = useDataContext();

  const handleLogout = () => {
    clearInformation();
    logout();
  };

  return (
    <View>
      <Image
        source={require("./../../assets/images/login-image.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-10 bg-white mt-[-20px] rounded-t-3xl ">
        <Text style={{ textAlign: "center" }} className="text-[30px] font-bold">
          Anafin
        </Text>
        <Text className="text-[18px] text-slate-500 mt-4 mb-2">
          Facilita el análisis financiero, utilizando inteligencia artificial
          para proporcionar interpretaciones detalladas sobre los indicadores
          financieros, análisis verticales y horizontales.
        </Text>
        <CustomFormButton
          onPressFunction={handleLogout}
          textButton={
            user?.id !== "usuarioIncognito" ? "Cerrar sesión" : "Ir al login"
          }
        />
      </View>
    </View>
  );
};

export default ConfigurationsComponent;
