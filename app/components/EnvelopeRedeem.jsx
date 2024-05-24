import React, { useState, useEffect } from "react";
import { View, Text, Image, Animated } from "react-native";
import { Envelope } from "./Envelope";
import { images } from "../assets/assets";

export function EnvelopeRedeem({ isOpen, setIsOpen, amount, tokenSymbol, tokenIcon }) {
  return (
    <View className="mt-36">
      <View className={`${!isOpen && "-rotate-3"}`}>
        <Envelope
          isOpen={isOpen}
          onPress={() => {
            setIsOpen(!isOpen);
          }}
        >
          <View className="flex-1 items-center text-center px-8 py-4 space-y-2">
            <Text className="text-[#F2F2F2] text-xs">YOU WON</Text>
            <View className="flex-row items-center justify-center space-x-2">
              <Image source={tokenIcon} className="rounded-full w-8 h-8" />
              <Text className="text-[#F2F2F2] font-bold text-2xl">
                {amount} {tokenSymbol}
              </Text>
            </View>
            <Text className="text-[#F2F2F2] text-xs">Congratulations!</Text>
          </View>
        </Envelope>
      </View>

      <Image
        className="w-8 h-8 absolute bottom-36 -left-6 z-20"
        source={images.envelope.star}
      />
      <Image
        className="w-8 h-8 absolute bottom-40 -right-5 z-20"
        source={images.envelope.star}
      />

      <Image
        className="w-4 h-4 absolute bottom-48 -right-8 z-20"
        source={images.envelope.star}
      />
    </View>
  );
}
