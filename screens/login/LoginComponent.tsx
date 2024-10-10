import React from "react";
import { Image, Text, View } from "react-native";
import ButtonLogin from "@/components/ButtonLogin";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";

const LoginComponent = () => {
  const { login, loginWithoutGoogle } = useAuth();
  return (
    <View>
      <Image
        source={require("./../../assets/images/login-image.jpg")}
        className="w-full h-[400px] object-cover"
      />
      <View className="p-10 bg-white mt-[-20px] rounded-t-3xl ">
        <Text className="text-[30px] font-bold text-center">Anafin</Text>
        <Text className="text-[18px] text-slate-500 mt-4 mb-2">
          Facilita el análisis financiero, utilizando inteligencia artificial
          para proporcionar interpretaciones detalladas sobre los indicadores
          financieros, análisis verticales y horizontales.
        </Text>
        <ButtonLogin onPressFunction={login} />
        <ButtonLogin
          textButton="Continuar sin iniciar sesión"
          background={Colors.GrayColor}
          onPressFunction={loginWithoutGoogle}
        />
      </View>
    </View>
  );
};

export default LoginComponent;
