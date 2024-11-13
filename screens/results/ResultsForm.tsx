import CustomAccordion from "@/components/CustomAccordion";
import CustomFormButton from "@/components/CustomFormButton";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface ResultsFormProps {
  title?: string;
  resultContent?: string;
  isNew?: boolean;
  disabledButton?: boolean;
  OnPressButton: () => void;
}
const ResultsForm = ({
  title,
  resultContent,
  isNew,
  disabledButton = false,
  OnPressButton,
}: ResultsFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <CustomAccordion
      title={title ?? `Resultados sin titulo`}
      isOpen={isOpen}
      onToggle={toggleAccordion}
    >
      <View className="p-4">
        <Text className="text-[16px]">{resultContent}</Text>
        <CustomFormButton
          onPressFunction={OnPressButton}
          backgroundColor={isNew ? Colors.GreenColor : Colors.RedColor}
          textButton={isNew ? "Guardar" : "Eliminar"}
          isDisabled={disabledButton}
        />
      </View>
    </CustomAccordion>
  );
};

export default ResultsForm;
