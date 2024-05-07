import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export function TabSelector({ activeTab, setActiveTab }) {
  return (
    <View className="flex-row items-center space-x-6">
      {/* Tabs */}
      <TouchableOpacity onPress={() => setActiveTab("Sent")}>
        <Text
          className={`font-bold text-sm ${
            activeTab === "Sent"
              ? "text-[#5166EE] border-b-2 border-[#5166EE]"
              : "text-gray-500"
          }`}
        >
          Sent
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab("Collected")}>
        <Text
          className={`font-bold text-sm ${
            activeTab === "Collected"
              ? "text-[#5166EE] border-b-2 border-[#5166EE]"
              : "text-gray-500"
          }`}
        >
          Collected
        </Text>
      </TouchableOpacity>
    </View>
  );
}
