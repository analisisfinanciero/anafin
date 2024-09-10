import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Reports"
        options={{
          headerTitle: "Reportes",
          tabBarLabel: "Reportes",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Configurations"
        options={{
          title: "Opciones",
          tabBarLabel: "Opciones",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
