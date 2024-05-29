import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Bar } from "react-native-progress";
import { images } from "../assets/assets";
import { useLifafaProgram } from "../hooks/useLifafaProgram";
import { useWallet } from "../providers/WalletProvider";
import dayjs from "dayjs";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { handleCopyLink, handleShare } from "../utils/share";

export function EnvelopeCard({ id }) {
  const { fetchLifafa } = useLifafaProgram();
  const { wallet } = useWallet();
  const [lifafaData, setLifafaData] = useState();

  async function getLifafaData() {
    if (!id) {
      setLifafaData(null);
    }
    try {
      const pdaData = await fetchLifafa(id);
      // console.log("pdaData: ", pdaData);
      const expiryTime = dayjs.unix(
        Number(pdaData.creationTime) + Number(pdaData.timeLimit)
      );
      const daysLeft = expiryTime.diff(dayjs(), "day");
      const lifafaDataTmp = {
        id: id,
        amount: Number(pdaData.amount / LAMPORTS_PER_SOL),
        maxClaims: pdaData.maxClaims,
        claimed: pdaData.claimed.length,
        numDaysLeft: daysLeft,
        ownerName: pdaData.ownerName,
        desc: pdaData.desc,
        tokenSymbol: "SOL", //TODO
        tokenIcon: images.tokens.sol,
        amountInr: Number(pdaData.amount / LAMPORTS_PER_SOL) * 11906, //TODO update with price api
      };
      // console.log(lifafaDataTmp);
      setLifafaData(lifafaDataTmp);
    } catch (error) {
      console.log("getLifafaData: ", error);
      setLifafaData(null);
    }
  }

  useEffect(() => {
    if (wallet && id) {
      getLifafaData();
    }
  }, [id, wallet]);

  if (!lifafaData) {
    return null;
  }

  return (
    <View>
      <View className="items-end">
        <View className="abolute z-10 -bottom-6 right-3 w-14 py-1 px-1 rounded-b-lg rounded-tr-sm bg-[#F75757]">
          <Text className="text-white text-sm text-center font-semibold">
            {lifafaData.numDaysLeft} Days
          </Text>
        </View>
      </View>

      <View className="p-4 bg-[#F5F6FE] rounded-2xl shadow-lg">
        {/* Header with icon, amount, and more options */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center space-x-2">
            <Image
              source={lifafaData.tokenIcon}
              className="rounded-full w-8 h-8"
            />
            <View>
              <Text className="font-bold">
                {lifafaData.amount} {lifafaData.tokenSymbol}
              </Text>
              <Text className="text-xs text-gray-500">₹{lifafaData.amountInr}</Text>
            </View>
          </View>
        </View>

        {/* Claimed info and progress */}
        <View className="flex-row justify-between items-center mb-4">
          <Bar
            progress={lifafaData.claimed / lifafaData.maxClaims}
            className="w-54"
            color="#37B271"
            unfilledColor="#EAEDFD"
          />
          <Text className="text-sm text-gray-500">
            {lifafaData.claimed}/{lifafaData.maxClaims} Claimed
          </Text>
        </View>

        {/* Message */}
        <Text className="text-[#707070] mb-4">{lifafaData.desc}</Text>

        {/* Action buttons */}
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="flex-1 bg-white border border-gray-300 py-2 rounded-full"
            onPress={() => {
              handleCopyLink(id);
            }}
          >
            <Text className="text-black text-center text-sm">Copy link</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-white border border-gray-300 py-2 rounded-full"
            onPress={() => {
              handleShare(id);
            }}
          >
            <Text className="text-black text-center text-sm">Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
