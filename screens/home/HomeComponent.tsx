import ButtonLogin from "@/components/ButtonLogin";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Text, View } from "react-native";

const HomeComponent = () => {
  const { logout } = useAuth();
  return (
    <View>
      <Text>Home component prueba juan camilo .</Text>
      <ButtonLogin onPressFunction={logout} textButton="Cerrar sesión" />
    </View>
  );
};

export default HomeComponent;
