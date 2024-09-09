import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [isLoginUser, setIsLoginUser] = useState(false);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoginUser ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="index" />
      )}
    </Stack>
  );
}
