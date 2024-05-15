import React from "react";
import { View, TextInput } from "react-native";
import { UsersIcon } from "react-native-heroicons/outline";

export const MaxClaimsInput = ({ maxClaims, onChangeMaxClaims }) => (
  <View className="relative">
    <TextInput
      className="bg-white border border-gray-200 px-4 py-2 rounded-lg mb-2 focus:border-[#5166EE]"
      placeholder="Add max no. of recipients"
      placeholderTextColor={"#B9B9B9"}
      onChangeText={onChangeMaxClaims}
      keyboardType="numeric"
    >
      {maxClaims}
    </TextInput>
    <View className="absolute right-4 bottom-5">
      <UsersIcon fill="#FFFFFF" color="black" size={20} />
    </View>
  </View>
);
