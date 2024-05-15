import React from "react";
import { TouchableOpacity, Text } from "react-native";

export const CreateButton = ({ disabled, onPress }) => (
  <TouchableOpacity
    disabled={disabled}
    style={{ backgroundColor: disabled ? "#B9B9B9" : "black" }}
    className="p-4 rounded-full mt-6"
    onPress={onPress}
  >
    <Text className="text-white text-center">Create</Text>
  </TouchableOpacity>
);
