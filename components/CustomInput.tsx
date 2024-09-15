import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => {
  return (
    <View className="mb-4">
      <Text className="mb-1">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default CustomInput;
