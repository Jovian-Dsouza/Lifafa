import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { images } from "../assets/assets";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ChevronDownIcon } from "react-native-heroicons/solid";
import { UsersIcon, ClockIcon } from "react-native-heroicons/outline";
import { MultilineTextInput } from "./MultilineTextInput";
import { TransactionRequestModal } from "./TransactionRequestModal";
import { EnvelopeModal } from "./EnvelopeModal";

export const CreateLifafaComponent = () => {
  const [amount, setAmount] = useState("0");
  const [numPeople, setNumPeople] = useState("");
  const [time, setTime] = useState();
  const [desc, setDesc] = useState("");
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [envelopeModalVisible, setEnvelopModalVisible] = useState(false);

  const isCreateDisabled = useMemo(() => {
    return amount === "0" || numPeople === "" || desc === "" || time === null;
  }, [amount, numPeople, time, desc]);

  //   useEffect(()=>{
  //   }, [])

  return (
    <View className="min-w-full bg-[#F5F6FE] my-6 rounded-3xl p-4 shadow">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Create Lifafa</Text>
        <Text className="text-[#707070] text-xs">Bal: 1065 USDC</Text>
      </View>

      {/*Select Token and price */}
      <View className="bg-white border border-gray-200 p-3 rounded-2xl flex-row items-center justify-between mb-4">
        <View className="flex-row items-center">
          <View className="mr-4">
            <Image
              source={images.tokens.usdc}
              className="rounded-full w-8 h-8"
            />
            <View className="absolute -bottom-1 -right-1 border border-white rounded-full">
              <Image
                source={images.tokens.sol}
                className="rounded-full w-4 h-4"
              />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => {}}
              className="flex-row items-center justify-center space-x-1"
            >
              <Text className="font-semibold">USDC</Text>
              <ChevronDownIcon fill="#161616" size={16} />
            </TouchableOpacity>

            <Text className="text-xs text-[#707070]">on Solana</Text>
          </View>
        </View>
        <View className="flex-1 items-end">
          <TextInput
            className="text-xl text-end font-semibold"
            onChangeText={setAmount}
            keyboardType="numeric"
          >
            {amount}
          </TextInput>
          <Text className="text-xs text-[#707070]">₹4164.83</Text>
        </View>
      </View>

      <View className="relative">
        <TextInput
          className="bg-white border border-gray-200 px-4 py-2 rounded-lg mb-2 focus:border-[#5166EE]"
          placeholder="Add max no. of recipients"
          placeholderTextColor={"#B9B9B9"}
          onChangeText={setNumPeople}
          keyboardType="numeric"
        >
          {numPeople}
        </TextInput>
        <View className="absolute right-4 bottom-5">
          <UsersIcon fill="#FFFFFF" color="black" size={20} />
        </View>
      </View>
      <Text className="text-center text-[#707070] text-xs mb-4">
        Each gets a random amount from the total.
      </Text>

      {/* Calendar */}
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => setIsTimePickerVisible(true)}
        className="bg-white border border-gray-200  p-3 rounded-lg flex-row justify-between items-center mb-4 focus:border-[#5166EE]"
      >
        <Text className={time ? "" : "text-[#B9B9B9]"}>
          {time ? dayjs(time).format("D MMM YYYY") : "Add end date"}
        </Text>
        <ClockIcon fill="#FFFFFF" color="black" size={20} />
      </TouchableOpacity>

      {/* Description */}
      <MultilineTextInput text={desc} setText={setDesc} maxLength={50} />

      {/* Create button */}
      <TouchableOpacity
        disabled={isCreateDisabled} // Disable the button if any of the conditions are true
        style={{ backgroundColor: isCreateDisabled ? "#B9B9B9" : "black" }}
        className="p-4 rounded-full mt-6"
        onPress={() => setTransactionModalVisible(true)}
      >
        <Text className="text-white text-center">Create</Text>
      </TouchableOpacity>

      {/* Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="date"
        onConfirm={(time) => {
          setTime(time);
          setIsTimePickerVisible(false);
        }}
        onCancel={() => {
          setIsTimePickerVisible(false);
        }}
      />

      <TransactionRequestModal
        visible={transactionModalVisible}
        setVisible={setTransactionModalVisible}
        onAccept={() => {setEnvelopModalVisible(true)}}
        onReject={() => {}}
      />

      <EnvelopeModal
        visible={envelopeModalVisible}
        setVisible={setEnvelopModalVisible}
      />
    </View>
  );
};
