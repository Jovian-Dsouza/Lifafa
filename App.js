import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./app/navigation";
import { OktoProvider, BuildType } from "okto-sdk-react-native";
import { OKTO_CLIENT_API_KEY } from "@env";
import { NativeWindStyleSheet } from "nativewind";
import { getRandomValues as expoCryptoGetRandomValues } from "expo-crypto";
import "react-native-get-random-values";
import { Buffer } from "buffer";
import { ClusterProvider } from "./app/providers/ClusterProvider";
import { ConnectionProvider } from "./app/providers/ConnectionProvider";
import { WalletProvider } from "./app/providers/WalletProvider";
import { AppContextProvider } from "./app/providers/AppContextProvider";
import { linking } from "./app/linking";
import { LogBox } from "react-native";

global.Buffer = Buffer;
global.TextEncoder = require("text-encoding").TextEncoder;
global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val));
};

class Crypto {
  getRandomValues = expoCryptoGetRandomValues;
}
const webCrypto = typeof crypto !== "undefined" ? crypto : new Crypto();
(() => {
  if (typeof crypto === "undefined") {
    Object.defineProperty(window, "crypto", {
      configurable: true,
      enumerable: true,
      get: () => webCrypto,
    });
  }
})();

NativeWindStyleSheet.setOutput({
  default: "native",
});

LogBox.ignoreLogs(["ReactImageView:"]);

export default function App() {
  return (
    <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
      <ClusterProvider defaultClusterName="devnet">
        <ConnectionProvider>
          <WalletProvider>
            <AppContextProvider>
              <NavigationContainer linking={linking}>
                <Navigation />
              </NavigationContainer>
            </AppContextProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ClusterProvider>
    </OktoProvider>
  );
}
