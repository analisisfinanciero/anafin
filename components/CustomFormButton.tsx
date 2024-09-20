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
      className=""
      disabled={isDisabled}
    >
      <Text className="text-[18px]">{textButton ?? "Botón default"}</Text>
    </TouchableOpacity>
  );
};

export default CustomFormButton;
