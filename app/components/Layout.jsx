import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Header } from "./Header";
import { StatusBar } from "expo-status-bar";

export const Layout = ({ children, customClass }) => {
  return (
    <SafeAreaView
      className={`flex-1 items-center justify-between ${customClass} px-5 pt-12 bg-white`}
    >
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Header />
        <View className="flex-1 items-center justify-center">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};
