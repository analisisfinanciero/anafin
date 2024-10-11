import { CurrencyFormatter } from "@/utils/FunctionsUtils";
import { Text, TextInput, View } from "react-native";
import CurrencyInput from "react-native-currency-input";

interface CustomInputProps {
  label: string;
  value: string;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  editable?: boolean;
  inputType?: "text" | "number" | "percentage" | "currency";
  onChangeText: (text: string) => void;
  onBlur?: (action: any) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  placeholder,
  keyboardType = "default",
  editable = true,
  inputType = "text",
  onChangeText,
  onBlur,
}) => {
  const Handlers = {
    number: (text: string) => text.replace(/\D/g, ""),
    percentage: (text: string) => {
      const sanitized = text.replace(/[^0-9.]/g, "");
      const parts = sanitized.split(".");
      return parts.length > 2
        ? `${parts[0]}.${parts.slice(1).join("")}`
        : sanitized;
    },
    currency: (text: string) => CurrencyFormatter(text),

    text: (text: string) => text,
  };

  const handleTextChange = (text: string) => {
    const sanitizedText = Handlers[inputType](text);
    onChangeText(sanitizedText);
  };

  return (
    <View className="mb-4">
      <Text className="mb-1 text-[16px]">{label}</Text>
      {inputType === "currency" ? (
        <CurrencyInput
          className="border border-gray-300 rounded-lg p-2 text-[16px]"
          value={parseFloat(value)}
          onChangeValue={(valueInput) => {
            onChangeText(valueInput?.toString() ?? "0");
          }}
          prefix="$  "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          editable={editable}
        />
      ) : (
        <TextInput
          className="border border-gray-300 rounded-lg p-2 text-[16px]"
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder ?? ""}
          keyboardType={keyboardType}
          onBlur={onBlur}
          editable={editable}
        />
      )}
    </View>
  );
};

export default CustomInput;
