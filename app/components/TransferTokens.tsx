import React, { useState } from "react";
import { transferFunds } from "rn-okto-sdk";
import { View, Text, TextInput, Button } from "react-native";

interface Result {
  status: string;
  data: {
    order_id: string,
  };
}

const TransferTokens = () => {
  const [networkName, setNetworkName] = useState("SOLANA_DEVNET");
  const [tokenAddress, setTokenAddress] = useState(
    "0x1::aptos_coin::AptosCoin"
  );
  const [quantity, setQuantity] = useState("1");
  const [recipientAddress, setRecipientAddress] = useState(
    "0x6b244684313dd6a9fc75c8e76cb648d407374d59970583dd990c686cda767984"
  );

  const handleSubmit = () => {
    transferFunds(
      networkName,
      tokenAddress,
      recipientAddress,
      quantity,
      (result, error) => {
        if (result) {
          const result: Result = JSON.parse(result);
          console.log(result.data);
        }
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text>Transfer Tokens</Text>
      <TextInput
        value={networkName}
        onChangeText={(value) => setNetworkName(value)}
        placeholder="Enter Network Name"
      />
      <TextInput
        value={tokenAddress}
        onChangeText={(value) => setTokenAddress(value)}
        placeholder="Enter Token Address"
      />
      <TextInput
        value={quantity}
        onChangeText={(value) => setQuantity(value)}
        placeholder="Enter Quantity"
      />
      <TextInput
        value={recipientAddress}
        onChangeText={(value) => setRecipientAddress(value)}
        placeholder="Enter Recipient Address"
      />
      <Button title="Transfer Tokens" onPress={handleSubmit} />
    </View>
  );
};

export default TransferTokens;
