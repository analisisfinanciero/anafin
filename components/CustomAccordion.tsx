import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
}
const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View className="border border-neutral-200 rounded mb-4">
      <TouchableOpacity
        onPress={toggleExpand}
        className="flex-row items-center justify-between p-4"
      >
        <Text className="text-[18px] font-bold">{title}</Text>
        <Ionicons
          name={isExpanded ? "arrow-down" : "arrow-forward"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View className="border-t border-neutral-200">{children}</View>
      )}
    </View>
  );
};

export default CustomAccordion;
