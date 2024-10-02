import ButtonLogin from "@/components/ButtonLogin";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { View, Text, Image } from "react-native";

const ConfigurationsComponent = () => {
  const { logout } = useAuth();
  return (
    <View>
        <Image
        source={require("./../../assets/images/login-image.jpg")}
        className="w-full h-[400px] object-cover"
        />
        <View className="p-10 bg-white mt-[-20px] rounded-t-3xl ">
          <Text style={{ textAlign: 'center' }} className="text-[30px] font-bold">Anafin</Text>
          <Text className="text-[18px] text-slate-500 mt-4 mb-2">
            Facilita el análisis financiero, utilizando inteligencia artificial
            para proporcionar interpretaciones detalladas sobre los indicadores
            financieros, análisis verticales y horizontales.
          </Text>
        <ButtonLogin onPressFunction={logout} textButton="Cerrar sesión" />
      </View>
    </View>
    
  );
};

export default ConfigurationsComponent;
