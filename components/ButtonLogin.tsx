import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
interface GoogleButtonLoginProps {
  onPressFunction: () => void;
  textButton?: string;
  background?: string;
}
const ButtonLogin: React.FC<GoogleButtonLoginProps> = ({
  onPressFunction,
  textButton,
  background,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className={"p-3 rounded-full m-3"}
      style={{ backgroundColor: background ?? Colors.BlueColor }}
    >
      <Text className="text-white text-center text-[18px]">
        {textButton ?? "Iniciar sesión con Google"}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonLogin;
