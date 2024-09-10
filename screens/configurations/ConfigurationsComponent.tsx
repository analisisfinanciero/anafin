import ButtonLogin from "@/components/ButtonLogin";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { View } from "react-native";

const ConfigurationsComponent = () => {
  const { logout } = useAuth();
  return (
    <View>
      <ButtonLogin onPressFunction={logout} textButton="Cerrar sesión" />
    </View>
  );
};

export default ConfigurationsComponent;
