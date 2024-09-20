import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  label: string;
  value: string;
  placeholder: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  onChangeText: (text: string) => void;
  onBlur?: (action: any) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  placeholder,
  keyboardType = "default",
  onChangeText,
  onBlur,
}) => {
  const handleTextChange = (text: string) => {
    if (keyboardType === "numeric") {
      const sanitizedText = text.replace(/\D/g, "");
      onChangeText(sanitizedText);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-1 text-[18px]">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 text-[18px]"
        value={value}
        onChangeText={handleTextChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onBlur={onBlur}
      />
    </View>
  );
};

export default CustomInput;
