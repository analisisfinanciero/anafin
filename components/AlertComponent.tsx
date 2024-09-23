import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface AlertComponentProps {
  message: string;
  onDismiss: () => void;
  isVisible: boolean;
  type?: "info" | "warning" | "error" | "success";
}

const ALERTS: {
  [key in "info" | "warning" | "error" | "success"]: {
    name: keyof typeof Ionicons.glyphMap;
    color: string;
    style: string;
  };
} = {
  info: {
    name: "information-circle-outline",
    color: "#007AFF",
    style: "bg-blue-200 border-blue-400 text-blue-700",
  },
  warning: {
    name: "warning-outline",
    color: "#FFA500",
    style: "bg-yellow-200 border-yellow-400 text-yellow-700",
  },
  error: {
    name: "close-circle-outline",
    color: "#FF0000",
    style: "bg-red-200 border-red-400 text-red-700",
  },
  success: {
    name: "checkmark-circle-outline",
    color: "#4CAF50",
    style: "bg-green-200 border-green-400 text-green-700",
  },
};

const AlertComponent: React.FC<AlertComponentProps> = ({
  message,
  onDismiss,
  isVisible,
  type = "info",
}) => {
  if (!isVisible) return null;

  const { name, color, style } = ALERTS[type];

  return (
    <View
      className={`flex flex-row items-center p-4 border-l-4 ${style} rounded-md mb-4`}
    >
      <Ionicons name={name} size={24} color={color} />
      <Text className="ml-3 flex-1 text-base">{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Ionicons name="close-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default AlertComponent;
