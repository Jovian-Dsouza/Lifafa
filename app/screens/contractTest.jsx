import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useRedEnvelopeProgram } from "../hooks/useRedEnvelopeProgram";
import { useConnection } from "../providers/ConnectionProvider";
import { useEffect } from "react";
import { Button } from "react-native";
import { useOkto } from "okto-sdk-react-native";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getRandomId } from "../utils/random";

export default function ContractTestScreen({ route }) {
  const { id: routeId } = route.params 
  const { executeRawTransactionWithJobStatus } = useOkto();
  const { redEnvelopeProgram, createLifafa, fetchLifafa } =
    useRedEnvelopeProgram();
  const [id, setId] = useState(getRandomId());

  return (
    <View>
      <View style={styles.screenContainer}>
        <Text className="text-2xl font-bold">Lifafa Test</Text>
        <View style={styles.button} />
        <Button
          title="Create Lifafa"
          disabled={!redEnvelopeProgram}
          onPress={async () => {
            const tmpId = getRandomId();
            const { rawTxn, fee } = await createLifafa(
              tmpId,
              0.01,
              1000,
              2,
              "jovian"
            );
            console.log("fee: ", fee / LAMPORTS_PER_SOL);
            // TODO: Maybe update the recent blockhash
            const result = await executeRawTransactionWithJobStatus(rawTxn);
            console.log(result);
            setId(tmpId);
          }}
        />
        <View style={styles.button} />
        <Button
          title="Claim Lifafa"
          //   disabled={!redEnvelopeProgram}
          //   onPress={async () => {
          //     await claimLifafa(id);
          //   }}
        />

        <View style={styles.button} />
        <Button
          title="Fetch Lifafa"
          //   disabled={!redEnvelopeProgram}
          //   onPress={async () => {
          //     await fetchLifafa(id);
          //   }}
        />
        <View style={styles.button} />
        <Text className="text-lg font-semibold">Lifafa ID: {id}</Text>
        <Text className="text-lg font-semibold">Route ID: {routeId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    padding: 16,
  },
  button: {
    marginVertical: 4,
  },
});
