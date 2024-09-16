import { AuthContextProvider } from "@/context/AuthContext";
import { DataContextProvider } from "@/context/DataContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen name="Login" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
