import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const Empty = () => {
  return (
    <View className="flex text-center self-center items-center">
      <Text className="mb-3">No hay datos</Text>
      <Ionicons name="archive" size={26} color="black" />
    </View>
  );
};

export default Empty;
