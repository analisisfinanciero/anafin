import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface GoogleButtonLoginProps {
  onPressFunction: () => void;
  textButton?: string;
}
const ButtonLogin: React.FC<GoogleButtonLoginProps> = ({
  onPressFunction,
  textButton,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className={"p-4 bg-[#007AFF] rounded-full m-8"}
    >
      <Text className="text-white text-center text-[18px]">
        {textButton ?? "Iniciar sesión con Google"}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLogin;
