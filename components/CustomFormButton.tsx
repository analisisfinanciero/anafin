import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomFormButtonProps {
  onPressFunction: () => void;
  textButton?: string;
  isDisabled?: boolean;
}

const CustomFormButton: React.FC<CustomFormButtonProps> = ({
  onPressFunction,
  textButton,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className="p-3 rounded-full m-2"
      disabled={isDisabled}
      style={{
        backgroundColor: isDisabled ? Colors.GrayColor : Colors.BlueColor,
      }}
    >
      <Text className="text-white text-center text-[16px]">
        {textButton ?? "Botón default"}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomFormButton;
