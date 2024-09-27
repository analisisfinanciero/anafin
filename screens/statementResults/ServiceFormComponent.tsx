import React from "react";
import { Text, View } from "react-native";
import CustomAccordion from "@/components/CustomAccordion";
interface ServiceFormComponentProps {
  date: string;
}

const ServiceFormComponent: React.FC<ServiceFormComponentProps> = ({
  date,
}) => {
  return (
    <View>
      <CustomAccordion title={`Formulario del ${date}`}>
        <Text>Próximamente</Text>
      </CustomAccordion>
    </View>
  );
};

export default ServiceFormComponent;
