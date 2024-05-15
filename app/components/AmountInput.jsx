import React, { useMemo } from "react";
import { View, TextInput, Text } from "react-native";

export const AmountInput = ({ amount, setAmount, token }) => {
  const price = useMemo(() => {
    //TODO update with price api
    return amount * 11906.51;
  }, [amount]);

  return (
    <View className="flex-1 items-end">
      <TextInput
        className="text-xl text-end font-semibold"
        onChangeText={setAmount}
        keyboardType="numeric"
      >
        {amount}
      </TextInput>
      <Text className="text-xs text-center text-[#707070]">₹{price.toFixed(2)}</Text>
    </View>
  );
};
