import React from "react";
import { View, TextInput, Text } from "react-native";

export const MultilineTextInput = ({ maxLength, text, setText }) => {
  if(!text){
    text = ""
  }

  return (
    <View className="p-4 bg-white border border-gray-200 rounded-lg shadow">
      <TextInput
        className="text-sm"
        placeholderTextColor={"#B9B9B9"}
        onChangeText={(newText) => setText(newText.slice(0, maxLength))}
        value={text}
        multiline
        placeholder="Best wishes! here's a Lifafa for you!"
        maxLength={maxLength}
      />
      <Text className="text-right text-xs text-[#707070]">
        {text.length}/{maxLength}
      </Text>
    </View>
  );
};
