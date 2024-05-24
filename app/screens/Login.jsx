import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } from "@env";
import { useOkto } from "okto-sdk-react-native";
import { storeLocalStorage } from "../utils/storage";
import { USER_NAME_LOCAL_STORAGE_KEY } from "../constants";
import { images } from "../assets/assets";

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

function LoginIn({ navigation }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { authenticate, showWidgetSheet } = useOkto();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin();
      const { idToken, user } = response;
      storeLocalStorage(USER_NAME_LOCAL_STORAGE_KEY, user.name)
      if (idToken) {
        authenticate(idToken, (result, error) => {
          if (result) {
            console.log("Okto Authenticate:", result);
            navigation.navigate('Home')
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

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar style="auto" />
      <Image source={images.okto} className="w-20 h-20 mb-5" />
      {loading ? (
        <Text>Trying to Login ....</Text>
      ) : (
        <GoogleSigninButton onPress={handleGoogleLogin} />
      )}
    </View>
  );
}

export default LoginIn;
