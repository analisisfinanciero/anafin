import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import ButtonLogin from "@/components/ButtonLogin";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const LoginComponent = () => {
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId:
      "378349837326-88ovh8e0tg6nqdg96v3a882ql486lpdt.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    offlineAccess: true,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const response = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data?.idToken ?? null
      );
      console.log("googleCredential", googleCredential);
    } catch (error: any) {
      console.log("error", error);
    }
  };
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
        <ButtonLogin onPressFunction={signIn} />
      </View>
    </View>
  );
};

export default LoginComponent;
