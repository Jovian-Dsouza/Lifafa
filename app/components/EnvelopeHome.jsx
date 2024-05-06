import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Envelope } from "../components/Envelope";
import { images } from "../assets/assets";

export function EnvelopeHome() {
  return (
    <View className="mt-6">
      <Envelope isOpen={true} onPress={() => {}}>
        <View className="flex-1 items-center text-center px-8 py-4 space-y-2">
          <Text className="text-[#F2F2F2] font-bold text-xl">
            An Envelope for your loved ones
          </Text>
          <Text className="text-[#FFFFFF] opacity-70 text-xs">
            Gift crypto to your friends!
          </Text>
        </View>
      </Envelope>
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
