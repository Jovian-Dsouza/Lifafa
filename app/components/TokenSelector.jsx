import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { tokens } from "../constants";

export const TokenSelector = ({ token, onSelect }) => {
  function handleSelect() {
    onSelect(tokens[0]); //TODO: add token based on drop box
  }
  return (
    <View className="flex-row items-center">
      <View className="mr-4">
        <Image source={token.icon} className="rounded-full w-8 h-8" />
        <View className="absolute -bottom-1 -right-1 border border-white rounded-full">
          <Image
            source={token.blockchainIcon}
            className="rounded-full w-4 h-4"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleSelect}
          className="flex-row items-center justify-center space-x-1"
        >
          <Text className="font-semibold">{token.symbol}</Text>
          <ChevronDownIcon fill="#161616" size={16} />
        </TouchableOpacity>
        <Text className="text-xs text-[#707070]">on {token.blockchain}</Text>
      </View>
    </View>
  );
};
