import React, { useMemo } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { Envelope } from "./Envelope";
import {
  XMarkIcon,
  UsersIcon,
  ClockIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";

export function EnvelopeModal({
  amount,
  tokenSymbol,
  tokenIcon,
  timeLeft,
  maxClaims,
  visible,
  setVisible,
  onCopyLink,
  onShare,
}) {
  const numDaysLeft = useMemo(() => {
    if (timeLeft > 0) {
      return Math.ceil(timeLeft / (60 * 60 * 24)); // Convert seconds to days
    }
    return 0;
  }, [timeLeft]);

  function close() {
    setVisible(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={close}
    >
      <View className="flex-1 bg-black opacity-90 w-full h-full items-center justify-center">
        <StatusBar backgroundColor="black" />
        <View className="">
          <TouchableOpacity
            onPress={close}
            className="absolute right-0 -top-4 z-30"
          >
            <XMarkIcon fill="#FFFFFF" color="#FFFFFF" size={20} />
          </TouchableOpacity>

          <Envelope isOpen={true} onPress={() => {}}>
            <View className="flex-1  items-center text-center px-8 py-4 space-y-2">
              <Text className="text-[#F2F2F2] text-xs">Lifafa Created!</Text>
              <View className="flex-row items-center justify-center space-x-2">
                <Image source={tokenIcon} className="rounded-full w-8 h-8" />
                <Text className="text-[#F2F2F2] font-bold text-2xl">
                  {amount} {tokenSymbol}
                </Text>
              </View>

              <View className="flex-row items-center justify-center space-x-2">
                <ClockIcon fill="#601BD4" color="white" size={18} />
                <Text className="text-[#F2F2F2] text-xs">
                  {numDaysLeft} days
                </Text>
                <View className="bg-[#F2F2F2] p-0.5 rounded-full" />
                <UsersIcon fill="#601BD4" color="white" size={18} />
                <Text className="text-[#F2F2F2] text-xs">
                  {maxClaims ? maxClaims : 0}
                </Text>
              </View>
            </View>
          </Envelope>
        </View>
        <View className="flex-row max-w-full mt-4 space-x-4">
          <TouchableOpacity
            className="bg-white  w-[30%] py-2 rounded-full"
            onPress={() => {
              onCopyLink();
              close();
            }}
          >
            <Text className="text-black text-center text-sm font-semibold">
              Copy link
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white  w-[30%] py-2 rounded-full"
            onPress={() => {
              onShare();
              close();
            }}
          >
            <Text className="text-black text-center text-sm font-semibold">
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
