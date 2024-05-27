import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { StatusBar } from "expo-status-bar";
import { images } from "../assets/assets";
import { ShieldCheckIcon } from "react-native-heroicons/outline";

export function TransactionRequestModal({
  amount,
  symbol,
  fee,
  visible,
  setVisible,
  onAccept,
  onReject,
}) {
  const [animateModal, setAnimateModal] = useState(false);
  const close = () => {
    setVisible(false);
    setAnimateModal(false);
  };

  return (
    <SwipeUpDownModal
      modalVisible={visible}
      PressToanimate={animateModal}
      HeaderStyle={{
        marginTop: 0,
      }}
      ContentModalStyle={{
        marginTop: 0,
      }}
      ContentModal={
        <View className="flex-1 items-center justify-center">
          {/* TODO set proper status bar color */}
          <StatusBar backgroundColor="white" />

          <View className="py-0.5 px-2 rounded-full w-10 border-white bg-white mb-1.5 mt-52" />

          {/* Modal content */}
          <View className="bg-white flex-1 rounded-t-3xl w-full p-4">
            <View className="mb-2">
              <View className="border-2 border-white">
                <Image source={images.lifafa} className="w-14 h-14" />
              </View>

              <View className="absolute left-10 border-2 border-white rounded-full">
                <Image source={images.okto} className="w-14 h-14" />
              </View>
            </View>

            <Text className="text-2xl font-bold text-black">
              Transaction request
            </Text>
            <Text className="text-[#B9B9B9] mt-4">
              <Text className="text-black underline">Lifafa</Text> wants to
              transact from your wallet. Once confirmed you can track orders
              from Activity
            </Text>
            <View className="mt-6 border border-[#F5F6FE] rounded-xl">
              <View className="bg-[#F5F6FE] py-6 px-4 rounded-xl">
                {amount ? (
                  <View>
                    <Text className="text-[#707070] mb-2">
                      Create a Lifafa with
                    </Text>
                    <Text className="text-[#161616] text-lg font-semibold">
                      {amount} {symbol}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text className="text-[#707070] mb-2">
                      Claim Lifafa
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-row items-center justify-between py-4 px-4">
                <Text className="text-[#707070]">
                  Fees:{" "}
                  <Text className="text-[#161616]">
                    {fee} {symbol}
                  </Text>
                </Text>
                <Text className="text-blue-500">Show ▼</Text>
              </View>
            </View>
            <View className="flex-row items-center m-6 space-x-2">
              <ShieldCheckIcon fill="#FFFFFF" color="#2AAB82" size={20} />
              <Text className="text-[#B9B9B9] text-sm">
                This request is from a verified Dapp
              </Text>
            </View>
            <View className="flex-row mt-4 space-x-4">
              <TouchableOpacity
                className="bg-black flex-1 py-3 rounded-full"
                onPress={() => {
                  onAccept();
                  close();
                }}
              >
                <Text className="text-white text-center font-bold">Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-[#F75757]  flex-1 py-3 rounded-full"
                onPress={() => {
                  onReject();
                  close();
                }}
              >
                <Text className="text-[#F75757] text-center font-bold">
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
      onClose={close}
    />
  );
}
