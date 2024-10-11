import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}
const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  return (
    <View className="border border-neutral-200 rounded mb-4">
      <TouchableOpacity
        onPress={onToggle}
        className="flex-row items-center justify-between p-4"
      >
        <Text className="text-[18px] font-bold">{title}</Text>
        <Ionicons
          name={isOpen ? "arrow-down" : "arrow-forward"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <View
        className={`border-t border-neutral-200 `}
        style={isOpen ? styles.visible : styles.hidden}
      >
        {children}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  visible: {
    opacity: 1,
    height: "auto",
  },
  hidden: {
    opacity: 0,
    height: 0,
  },
});

export default CustomAccordion;
