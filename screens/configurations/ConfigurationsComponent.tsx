import CustomFormButton from "@/components/CustomFormButton";
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
      <CustomFormButton
        onPressFunction={handleLogout}
        textButton={
          user?.id !== "usuarioIncognito" ? "Cerrar sesión" : "Ir al login"
        }
      />
    </View>
  );
};

export default ConfigurationsComponent;
