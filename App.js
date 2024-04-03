import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./app/navigation";
import { OktoProvider, BuildType } from "okto-sdk-react-native";
import { OKTO_CLIENT_API_KEY } from "@env";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </OktoProvider>
  );
}