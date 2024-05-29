import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";
import { TabSelector } from "./TabSelector";
import { EnvelopeCard } from "./EnvelopeCard";
import { retrieveLifafa } from "../utils/firestoreUtils";
import { useWallet } from "../providers/WalletProvider";

export function ViewEnvelopesComponent() {
  const [activeTab, setActiveTab] = useState("Sent");
  const { walletPublicKey } = useWallet();
  const [lifafaIds, setLifafaIds] = useState([]);
  const lifafaType = useMemo(() => {
    return activeTab === "Sent" ? "created" : "collected";
  }, [activeTab]);

  useEffect(() => {
    const unsubscribe = retrieveLifafa(
      walletPublicKey,
      setLifafaIds,
      lifafaType
    );
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [lifafaType, walletPublicKey]);

  // useEffect(() => {
  //   console.log("Lifafa Ids: ", lifafaIds);
  // }, [lifafaIds]);

  return (
    <View className="flex-1 w-full mt-4 mb-8">
      <Text className="text-xl font-bold text-black mb-3">My Envelopes</Text>
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      {lifafaIds.length === 0 ? (
        <Text className="text-center font-semibold mt-5">No Lifafa here 🀄</Text>
      ) : (
        lifafaIds.map((id) => <EnvelopeCard key={id} id={id} />)
      )}
    </View>
  );
}
