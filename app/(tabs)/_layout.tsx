import { useAuth } from "@/context/AuthContext";
import {Tabs} from "expo-router";
import React from "react";
import { Text } from "react-native";

const _layout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
};

export default _layout;
