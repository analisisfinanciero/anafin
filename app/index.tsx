import React from "react";
import { ActivityIndicator, View } from "react-native";

const index = () => {
  return (
    <View className="h-screen flex items-center justify-center">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default index;
