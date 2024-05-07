import React, { useState } from "react";
import { View, Text } from "react-native";
import { TabSelector } from "./TabSelector";
import { EnvelopeCard } from "./EnvelopeCard";

export function ViewEnvelopesComponent() {
  const [activeTab, setActiveTab] = useState("Sent");
  return (
    <View className="flex-1 w-full mt-4">
      <Text className="text-xl font-bold text-black mb-3">My Envelopes</Text>
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <View className="">
        <EnvelopeCard />
        <EnvelopeCard />
      </View>
    </View>
  );
}
