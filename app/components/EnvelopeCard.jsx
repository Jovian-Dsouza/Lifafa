import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Bar } from "react-native-progress";
import { images } from "../assets/assets";

export function EnvelopeCard() {
  return (
    <View>
      <View className="items-end">
        <View className="abolute z-10 -bottom-6 right-3 w-14 py-1 px-1 rounded-b-lg rounded-tr-sm bg-[#F75757]">
          <Text className="text-white text-sm text-center font-semibold">
            3 Days
          </Text>
        </View>
      </View>

      <View className="p-4 bg-[#F5F6FE] rounded-2xl shadow-lg">
        {/* Header with icon, amount, and more options */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center space-x-2">
            <Image
              source={images.tokens.usdc}
              className="rounded-full w-8 h-8"
            />
            <View>
              <Text className="font-bold">10 USDT</Text>
              <Text className="text-xs text-gray-500">₹832.57</Text>
            </View>
          </View>
        </View>

        {/* Claimed info and progress */}
        <View className="flex-row justify-between items-center mb-4">
          <Bar
            progress={0.56}
            className="w-54"
            color="#37B271"
            unfilledColor="#EAEDFD"
          />
          <Text className="text-sm text-gray-500">56/100 Claimed</Text>
        </View>

        {/* Message */}
        <Text className="text-[#707070] mb-4">
          Merry Christmas and a happy new year!
        </Text>

        {/* Action buttons */}
        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-1 bg-white border border-gray-300 py-2 rounded-full">
            <Text className="text-black text-center text-sm">Copy link</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-white border border-gray-300 py-2 rounded-full">
            <Text className="text-black text-center text-sm">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
