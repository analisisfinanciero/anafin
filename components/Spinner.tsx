import { Colors } from "@/constants/Colors";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface SpinnerProps {
  size?: "small" | "large";
  color?: string;
}

const Spinner = ({
  size = "large",
  color = Colors.GrayColor,
}: SpinnerProps) => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Spinner;
