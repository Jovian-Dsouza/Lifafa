import React, { useState, useMemo, useEffect } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import { MultilineTextInput } from "./MultilineTextInput";
import { TransactionRequestModal } from "./TransactionRequestModal";
import { EnvelopeModal } from "./EnvelopeModal";
import { getRandomId } from "../utils/random";
import { useAppContext } from "../providers/AppContextProvider";
import { TokenSelector } from "./TokenSelector";
import { tokens } from "../constants";
import { AmountInput } from "./AmountInput";
import { MaxClaimsInput } from "./MaxClaimsInput";
import { DatePicker } from "./DatePicker";
import { CreateButton } from "./CreateButton";
import TokenBalance from "./TokenBalance";

export const CreateLifafaComponent = () => {
  const [amount, setAmount] = useState("0");
  const [maxClaims, setMaxClaims] = useState("");
  const [time, setTime] = useState();
  const [desc, setDesc] = useState("");
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [envelopeModalVisible, setEnvelopModalVisible] = useState(false);
  const [id, setId] = useState();
  const { user } = useAppContext();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

  // useEffect(() => {
  //   console.log(`user: ${user}`)
  // }, [user])

  const isCreateDisabled = useMemo(() => {
    return amount === "0" || maxClaims === "" || desc === "" || time === null;
  }, [amount, maxClaims, time, desc]);

  function handleCreate() {
    setTransactionModalVisible(true);
    const createLifafaData = {
      id: getRandomId(),
      amount: Number(amount),
      timeleft: dayjs(time).diff(dayjs(), "second"),
      maxClaims: Number(maxClaims),
      ownerName: user,
      desc: desc,
    };
    console.log("CreateLifafaData: ", createLifafaData);
    setId(createLifafaData.id);
  }

  function handleConfirm() {
    setEnvelopModalVisible(true);
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
        visible={transactionModalVisible}
        setVisible={setTransactionModalVisible}
        onAccept={handleConfirm}
        onReject={() => {}}
      />

      <EnvelopeModal
        visible={envelopeModalVisible}
        setVisible={setEnvelopModalVisible}
      />
    </View>
  );
};
