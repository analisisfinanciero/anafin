import React from "react";
import { Image, Text, View } from "react-native";
import GoogleButtonLogin from "@/components/GoogleButtonLogin";

const LoginComponent = () => {
  return (
    <View>
      <Image
        source={require("./../../assets/images/login-image.jpg")}
        className="w-full h-[600px] object-cover"
      />
      <View className="p-10 bg-white mt-[-20px] rounded-t-3xl ">
        <Text className="text-[30px] font-bold">Anafin</Text>
        <Text className="text-[18px] text-slate-500 mt-6">
          Facilita el análisis financiero, utilizando inteligencia artificial
          para proporcionar interpretaciones detalladas sobre los indicadores
          financieros, análisis verticales y horizontales.
        </Text>
        <GoogleButtonLogin
          onPressFunction={() => console.log("Login google")}
        />
      </View>
    </View>
  );
};

export default LoginComponent;
