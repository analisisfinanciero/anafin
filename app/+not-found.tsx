import CustomFormButton from "@/components/CustomFormButton";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const redirectFunction = () => {
    router.replace("/Login");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Algo ha salido mal con las rutas. Por favor regresa al inicio.
      </Text>
      <CustomFormButton
        onPressFunction={redirectFunction}
        textButton="Regresar al inicio"
      />
    </View>
  );
}
