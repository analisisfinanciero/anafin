import React from "react";
import { ActivityIndicator, View } from "react-native";

const LoadingComponent = () => {
  return (
    <View className="justify-center align-middle">
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default LoadingComponent;
