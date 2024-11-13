import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Información de la Empresa",
          tabBarLabel: "Inicio",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
