import React from "react";
import { SafeAreaView, View } from "react-native";
import { Header } from "./Header";

export const Layout = ({ children, customClass }) => {
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-between ${customClass} px-5 mt-12`}
    >
      <Header />
      <View className="flex-1 items-center justify-center">{children}</View>
    </SafeAreaView>
  );
};
