import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

interface CustomSelect {
  label: string;
  selectedValue: string | null;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string; id: string }[];
}

const CustomSelect: React.FC<CustomSelect> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (itemValue: any) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };
  return (
    <View className="mb-4">
      <Text className="mb-1 text-[16px]">{label}</Text>

      <TouchableOpacity
        className="border border-gray-300 rounded-lg p-3"
        onPress={() => setModalVisible(true)}
      >
        <Text className=" text-gray-600 text-[16px]">
          {selectedValue ?? "Selecciona una opción"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded-lg p-6">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 border-b border-gray-300"
                  onPress={() => handleSelect(item.value)}
                >
                  <Text className="text-[16px]">{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomSelect;
