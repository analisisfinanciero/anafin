import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface CustomFormButtonProps {
  onPressFunction: () => void;
  textButton?: string;
  isDisabled?: boolean;
  backgroundColor?: string;
}

const CustomFormButton: React.FC<CustomFormButtonProps> = ({
  onPressFunction,
  textButton,
  isDisabled,
  backgroundColor,
}) => {
  const buttonBackgroundColor = isDisabled
    ? Colors.GrayColor
    : backgroundColor ?? Colors.BlueColor;

  return (
    <TouchableOpacity
      onPress={onPressFunction}
      className="p-3 rounded-full m-2"
      disabled={isDisabled}
      style={{
        backgroundColor: buttonBackgroundColor,
      }}
    >
      <Text className="text-white text-center text-[16px]">
        {textButton ?? "Botón default"}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomFormButton;
