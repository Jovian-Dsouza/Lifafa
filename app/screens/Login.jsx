import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text, Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "@env";
import { useOkto } from "okto-sdk-react-native";
import { storeLocalStorage } from "../utils/storage";
import { USER_NAME_LOCAL_STORAGE_KEY } from "../constants";

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  scopes: ["profile", "email"],
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

function LoginIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { authenticate, showWidgetSheet } = useOkto();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      // console.log("user: ", user);
      storeLocalStorage(USER_NAME_LOCAL_STORAGE_KEY, user.name)
      if (idToken) {
        authenticate(idToken, (result, error) => {
          if (result) {
            console.log(result);
          }
          if (error) {
            console.error("Okto wallet login failure: ", error);
          }
        });
      }
    } catch (apiError) {
      console.error("error", apiError.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Google android client id: ", GOOGLE_ANDROID_CLIENT_ID);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-3">Okto API App</Text>
      <StatusBar style="auto" />
      <View>
        <Button title="Google Sign In" onPress={handleGoogleLogin} />
      </View>
      <View className="p-2" />
      <Button
        title="Open Okto Profile"
        onPress={() => {
          showWidgetSheet();
        }}
      />
    </View>
  );
}

export default LoginIn;
