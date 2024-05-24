import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { EnvelopeRedeem } from "../components/EnvelopeRedeem";
import { View, TouchableOpacity, Text } from "react-native";
import { images } from "../assets/assets";
import { TransactionRequestModal } from "../components/TransactionRequestModal";

const LifafaStatus = ({ numDaysLeft, claims, disabled, onOpen }) => {
  return (
    <View>
      <View className="flex-row items-center space-x-2 mb-5">
        <Text className="text-[#707070] text-sm">{numDaysLeft} days</Text>
        <View className="bg-[#707070] p-0.5 rounded-full" />
        <Text className="text-[#707070] text-sm">
          {claims ? claims : 0} claims left
        </Text>
      </View>
      <TouchableOpacity
        disabled={disabled}
        style={{ backgroundColor: disabled ? "#B9B9B9" : "black" }}
        className="p-4 rounded-full mt-6"
        onPress={onOpen}
      >
        <Text className="text-white text-center">Open Lifafa</Text>
      </TouchableOpacity>
    </View>
  );
};

const LifafaActions = () => {
  return (
    <View>
      <Text className="text-[#707070] text-sm mt-2">
        Create your own Lifafa and share with friends.
      </Text>
      <View className="flex-row mt-4 space-x-4">
        <TouchableOpacity
          className="border border-gray-300 flex-1 py-3 rounded-full"
          onPress={() => {}}
        >
          <Text className="text-black text-center font-bold">
            Create Lifafa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-black flex-1 py-3 rounded-full"
          onPress={() => {}}
        >
          <Text className="text-white text-center font-bold">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function Redeem({ route }) {
  const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const amount = 2;
  const tokenSymbol = "USDC";
  const tokenIcon = images.tokens.usdc;
  const disabled = false;
  const numDaysLeft = 9;
  const claims = 3;
  const ownerName = "Jovian";
  const fee = "0.0005"; //TODO

  function handleConfirm() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (route.params && route.params.id) {
      console.log("id = ", route.params.id);
      setId(route.params.id);
    }
  }, [route]);

  return (
    <Layout>
      <EnvelopeRedeem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        amount={amount}
        tokenSymbol={tokenSymbol}
        tokenIcon={tokenIcon}
      />

      <View className="flex-1 justify-center space-y-3 w-full mt-24">
        <Text className="text-sm text-[#707070]">From {ownerName}</Text>
        <Text className="text-2xl text-black font-bold">
          Best wishes, hope you win!
        </Text>

        {isOpen ? (
          <LifafaActions />
        ) : (
          <LifafaStatus
            numDaysLeft={numDaysLeft}
            claims={claims}
            disabled={disabled}
            onOpen={() => setTransactionModalVisible(true)}
          />
        )}
      </View>

      {/* TODO: Pass in the fees and amount and token */}
      <TransactionRequestModal
        amount={amount}
        symbol={tokenSymbol}
        fee={fee}
        visible={transactionModalVisible}
        setVisible={setTransactionModalVisible}
        onAccept={handleConfirm}
        onReject={() => {}}
      />
    </Layout>
  );
}

export default Redeem;
