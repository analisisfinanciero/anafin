import ButtonLogin from "@/components/ButtonLogin";
import { useAuth } from "@/context/AuthContext";
import { useDataContext } from "@/context/DataContext";
import React from "react";
import { View } from "react-native";

const ConfigurationsComponent = () => {
  const { user, logout } = useAuth();
  const { clearInformation } = useDataContext();

  const handleLogout = () => {
    clearInformation();
    logout();
  };

  return (
    <View>
      <ButtonLogin
        onPressFunction={handleLogout}
        textButton={
          user?.id !== "usuarioIncognito" ? "Cerrar sesión" : "Ir al login"
        }
      />
    </View>
  );
};

export default ConfigurationsComponent;
