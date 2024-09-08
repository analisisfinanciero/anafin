import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface GoogleButtonLoginProps {
  onPressFunction: () => void;
}
const GoogleButtonLogin: React.FC<GoogleButtonLoginProps> = ({
  onPressFunction,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className={`p-4 bg-[${Colors.BlueColor}] rounded-full m-8`}
    >
      <Text className="text-white text-center text-[18px]">
        Iniciar sesión con google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButtonLogin;
