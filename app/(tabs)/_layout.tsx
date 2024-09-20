import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          title: "Información de la Empresa",
          tabBarLabel: "Inicio",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="StatementResults"
        options={{
          headerTitle: "Estado de resultados",
          tabBarLabel: "Datos",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="albums" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Analytics"
        options={{
          headerTitle: "Analisis de datos",
          tabBarLabel: "Analisis",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="analytics" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="Configurations"
        options={{
          title: "Opciones",
          tabBarLabel: "Opciones",
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
