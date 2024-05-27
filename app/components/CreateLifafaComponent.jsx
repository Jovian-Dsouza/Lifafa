import React, { useState, useMemo, useEffect } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { View, Text, Share } from "react-native";
import dayjs from "dayjs";
import { MultilineTextInput } from "./MultilineTextInput";
import { TransactionRequestModal } from "./TransactionRequestModal";
import { EnvelopeModal } from "./EnvelopeModal";
import { getRandomId } from "../utils/random";
import { useAppContext } from "../providers/AppContextProvider";
import { TokenSelector } from "./TokenSelector";
import { BASE_URL, tokens } from "../constants";
import { AmountInput } from "./AmountInput";
import { MaxClaimsInput } from "./MaxClaimsInput";
import { DatePicker } from "./DatePicker";
import { CreateButton } from "./CreateButton";
import TokenBalance from "./TokenBalance";
import { useLifafaProgram } from "../hooks/useLifafaProgram";
import { useOkto } from "okto-sdk-react-native";

export const CreateLifafaComponent = () => {
  const { executeRawTransactionWithJobStatus } = useOkto();
  const { lifafaProgram, createLifafa } = useLifafaProgram();
  const [amount, setAmount] = useState("0");
  const [maxClaims, setMaxClaims] = useState("");
  const [time, setTime] = useState();
  const [desc, setDesc] = useState("");
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [envelopeModalVisible, setEnvelopModalVisible] = useState(false);
  const [id, setId] = useState();
  const { user } = useAppContext();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [txnData, setTxnData] = useState();
  const fee = useMemo(() => {
    if (txnData) {
      return txnData.fee;
    }
    return "0";
  }, [txnData]);
  const timeLeft = useMemo(() => {
    if (time) {
      return dayjs(time).diff(dayjs(), "second");
    }
    return 0;
  }, [time]);

  // useEffect(() => {
  //   console.log(`user: ${user}`)
  // }, [user])

  const isCreateDisabled = useMemo(() => {
    return (
      amount === "0" ||
      maxClaims === "" ||
      desc === "" ||
      time === null ||
      !lifafaProgram
    );
  }, [amount, maxClaims, time, desc]);

  async function handleCreate() {
    setTransactionModalVisible(true);
    const createLifafaData = {
      id: getRandomId(),
      amount: Number(amount),
      timeleft: timeLeft,
      maxClaims: Number(maxClaims),
      ownerName: user,
      desc: desc,
    };
    console.log("CreateLifafaData: ", createLifafaData);
    try {
      const txnDataTmp = await createLifafa(
        createLifafaData.id,
        createLifafaData.amount,
        createLifafaData.timeleft,
        createLifafaData.maxClaims,
        createLifafaData.ownerName,
        createLifafaData.desc
      );
      setTxnData(txnDataTmp);
      setId(createLifafaData.id);
    } catch (error) {
      console.error("create Lifafa: ", error);
    }
  }

  async function handleConfirm() {
    try {
      const result = await executeRawTransactionWithJobStatus(txnData.rawTxn);
      console.log(result);
      if (result.status === "SUCCESS") {
        setEnvelopModalVisible(true);
      } //TODO: handle else case
      else{
        alert("Transaction Failed!");
      }
    } catch (error) {
      console.error("handleConfirm: ", error);
      alert("Transaction Failed!")
    }
    finally {
      setTransactionModalVisible(false);
    }
  }

  async function handleShare() {
    try {
      const url = `${BASE_URL}/Redeem/${id}`;
      const result = await Share.share({
        title: "Lifafa",
        message: `Hey there! I've created a Lifafa for you. Click on the link below to redeem it:\n\n${url}`,
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCopyLink() {
    try {
      const url = `${BASE_URL}/Redeem/${id}`;
      Clipboard.setString(url);
    } catch (error) {
      console.error("handleCopy: ", error);
    }
  }

  return (
    <View className="min-w-full bg-[#F5F6FE] my-6 rounded-3xl p-4 shadow">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold">Create Lifafa</Text>
        <TokenBalance token={selectedToken} />
      </View>

      {/* Token Selector and price */}
      <View className="bg-white border border-gray-200 p-3 rounded-2xl flex-row items-center justify-between mb-4">
        <TokenSelector
          token={selectedToken}
          onSelect={(token) => setSelectedToken(token)}
        />

        <AmountInput
          amount={amount}
          setAmount={setAmount}
          token={selectedToken}
        />
      </View>

      <MaxClaimsInput maxClaims={maxClaims} onChangeMaxClaims={setMaxClaims} />

      <Text className="text-center text-[#707070] text-xs mb-4">
        Each gets a random amount from the total.
      </Text>

      <DatePicker time={time} setTime={setTime} />

      {/* Description */}
      <MultilineTextInput text={desc} setText={setDesc} maxLength={50} />

      <CreateButton onPress={handleCreate} disabled={isCreateDisabled} />

      {/* Modals */}
      {/* TODO: Pass in the fees and amount and token */}
      <TransactionRequestModal
        amount={amount}
        symbol={selectedToken.symbol}
        fee={fee}
        visible={transactionModalVisible}
        setVisible={setTransactionModalVisible}
        onAccept={handleConfirm}
        onReject={() => {}}
      />

      <EnvelopeModal
        amount={amount}
        tokenSymbol={selectedToken.symbol}
        tokenIcon={selectedToken.icon}
        timeLeft={timeLeft}
        maxClaims={maxClaims}
        visible={envelopeModalVisible}
        setVisible={setEnvelopModalVisible}
        onCopyLink={handleCopyLink}
        onShare={handleShare}
      />
    </View>
  );
};
