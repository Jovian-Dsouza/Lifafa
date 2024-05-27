import { useOkto } from "okto-sdk-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import { useCluster } from "../providers/ClusterProvider";
import { useWallet } from "../providers/WalletProvider";

function TokenBalance({ token }) {
  const { getPortfolio } = useOkto();
  const { selectedCluster } = useCluster();
  const { wallet, getBalance: getOktoBalance } = useWallet();
  const [balance, setBalance] = useState(0);

  const network_name = useMemo(
    () => selectedCluster.name.toUpperCase(),
    [selectedCluster]
  );

  async function getBalance() {
    const balanceTmp = await getOktoBalance(token.symbol);
    setBalance(balanceTmp);
  }

  useEffect(() => {
    if (wallet) {
      getBalance();
    }
  }, [token, network_name, wallet]);

  return (
    <Text className="text-[#707070] text-xs">
      Bal: {balance} {token.symbol}
    </Text>
  );
}

export default TokenBalance;
