import React from "react";
import { View, Text, Image } from "react-native";
import { images } from '../assets/assets';

export function Header() {
  return (
    <View className="flex-row items-center justify-between w-full">
      <View className="flex-row items-center space-x-3">
        <Image source={images.lifafa} className="h-8 w-8" />
        <Text className="text-xl text-txtPrimary font-poppins font-semibold">Lifafa</Text>
      </View>

      <View className="border border-gray-300 rounded-2xl px-2 py-0.5 items-center">
        <Text className="text-xs">FAQ</Text>
      </View>
    </View>
  );
}
