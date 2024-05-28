import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { EnvelopeRedeem } from "../components/EnvelopeRedeem";
import { View, TouchableOpacity, Text } from "react-native";
import { images } from "../assets/assets";
import { TransactionRequestModal } from "../components/TransactionRequestModal";
import { useLifafaProgram } from "../hooks/useLifafaProgram";
import { useOkto } from "okto-sdk-react-native";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import dayjs from "dayjs";
import { useWallet } from "../providers/WalletProvider";

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

function Redeem({ route, navigation }) {
  const { executeRawTransactionWithJobStatus } = useOkto();
  const { lifafaProgram, claimLifafa, fetchLifafa } = useLifafaProgram();
  const { wallet, getBalance, isLoggedIn } = useWallet();
  const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [lifafaData, setLifafaData] = useState();
  const amount = 2;
  const disabled = !lifafaProgram;
  const [txnData, setTxnData] = useState();
  const [initialBalance, setInitialBalance] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const fee = useMemo(() => {
    if (txnData) {
      return txnData.fee;
    }
    return "0";
  }, [txnData]);

  async function getLifafaData() {
    if (!id) {
      setLifafaData(null);
    }
    try {
      const pdaData = await fetchLifafa(id);
      // console.log("pdaData: ", pdaData);
      const remainingClaims = pdaData.maxClaims - pdaData.claimed.length;
      const expiryTime = dayjs.unix(
        Number(pdaData.creationTime) + Number(pdaData.timeLimit)
      );
      const daysLeft = expiryTime.diff(dayjs(), "day");
      const lifafaDataTmp = {
        id: id,
        amount: Number(pdaData.amount / LAMPORTS_PER_SOL),
        claims: remainingClaims,
        numDaysLeft: daysLeft,
        ownerName: pdaData.ownerName,
        desc: pdaData.desc,
        tokenSymbol: "SOL", //TODO
        tokenIcon: images.tokens.sol,
      };
      setLifafaData(lifafaDataTmp);
    } catch (error) {
      console.log("getLifafaData: ", error);
      setLifafaData(null);
    }
  }

  async function handleClaim() {
    setTransactionModalVisible(true);
    try {
      const balance = await getBalance(lifafaData.tokenSymbol);
      const txnDataTmp = await claimLifafa(id);
      setTxnData(txnDataTmp);
      setInitialBalance(Number(balance));
    } catch (error) {
      console.error("create Lifafa: ", error);
    }
  }

  async function handleConfirm() {
    try {
      const result = await executeRawTransactionWithJobStatus(txnData.rawTxn);
      console.log(result);
      if (result.status === "SUCCESS") {
        const balance = await getBalance(lifafaData.tokenSymbol);
        setFinalBalance(Number(balance));
        setIsOpen(true);
      } //TODO: handle else case
      else {
        alert("Transaction Failed!");
      }
    } catch (error) {
      console.error("handleConfirm: ", error);
      alert("Transaction Failed!");
    } finally {
      setTransactionModalVisible(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (route.params && route.params.id) {
      console.log("id = ", route.params.id);
      setId(route.params.id);
    }
    console.log("Id: ", id);
  }, [route]);

  useEffect(() => {
    if (wallet && id) {
      getLifafaData();
    }
  }, [id, wallet]);

  useEffect(() => {
    console.log("lifafaData: ", lifafaData);
  }, [lifafaData]);

  useEffect(()=>{
    console.log("initial balance", initialBalance)
    console.log("Final balance", finalBalance)
    console.log("Claimed amount: ", finalBalance - initialBalance)
  }, [finalBalance])
  if (!lifafaData) {
    return (
      <Layout>
        <View className="justify-center items-center w-full mt-24">
          <Text className="font-bold text-xl">Loading ...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <EnvelopeRedeem
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        amount={finalBalance - initialBalance}
        tokenSymbol={lifafaData.tokenSymbol}
        tokenIcon={lifafaData.tokenIcon}
      />

      <View className="flex-1 justify-center space-y-3 w-full mt-24">
        <Text className="text-sm text-[#707070]">
          From {lifafaData.ownerName}
        </Text>
        <Text className="text-2xl text-black font-bold">
          Best wishes, hope you win!
        </Text>

        {isOpen ? (
          <LifafaActions />
        ) : (
          <LifafaStatus
            numDaysLeft={lifafaData.numDaysLeft}
            claims={lifafaData.claims}
            disabled={disabled}
            onOpen={handleClaim}
          />
        )}
      </View>

      {/* TODO: Pass in the fees and amount and token */}
      <TransactionRequestModal
        symbol={lifafaData.tokenSymbol}
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
