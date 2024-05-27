import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLifafaProgram } from "../hooks/useLifafaProgram";
import { useConnection } from "../providers/ConnectionProvider";
import { useEffect } from "react";
import { Button } from "react-native";
import { useOkto } from "okto-sdk-react-native";
import { getRandomId } from "../utils/random";

export default function ContractTestScreen() {
  const { executeRawTransactionWithJobStatus } = useOkto();
  const { lifafaProgram, createLifafa, fetchLifafa, claimLifafa } = useLifafaProgram();
  const [id, setId] = useState(getRandomId());

  return (
    <View>
      <View style={styles.screenContainer}>
        <Text className="text-2xl font-bold">Lifafa Test</Text>
        <View style={styles.button} />
        <Button
          title="Create Lifafa"
          disabled={!lifafaProgram}
          onPress={async () => {
            try {
               const tmpId = getRandomId();
               const { rawTxn, fee } = await createLifafa(
                 tmpId,
                 0.01,
                 1000,
                 2,
                 "jovian",
                 "gift"
               );
               console.log("fee: ", fee);
               const result = await executeRawTransactionWithJobStatus(rawTxn);
               console.log(result);
               setId(tmpId);
            } catch (error) {
              console.error("create Lifafa: ", error)
            }
           
          }}
        />
        <View style={styles.button} />
        <Button
          title="Claim Lifafa"
          disabled={!lifafaProgram}
          onPress={async () => {
            const tmpId = getRandomId();
            const { rawTxn, fee } = await claimLifafa(id);
            console.log("fee: ", fee);
            // TODO: Maybe update the recent blockhash
            const result = await executeRawTransactionWithJobStatus(rawTxn);
            console.log(result);
            setId(tmpId);
          }}
        />

        <View style={styles.button} />
        <Button
          title="Fetch Lifafa"
            disabled={!lifafaProgram}
            onPress={async () => {
              await fetchLifafa(id);
            }}
        />
        <View style={styles.button} />
        <Text className="text-lg font-semibold">Lifafa ID: {id}</Text>
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
