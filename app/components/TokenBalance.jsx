import { useOkto } from "okto-sdk-react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Text } from "react-native";
import { useCluster } from "../providers/ClusterProvider";

function TokenBalance({ token }) {
  const { getPortfolio } = useOkto();
  const { selectedCluster } = useCluster();
  const [balance, setBalance] = useState(0);

  const network_name = useMemo(
    () => selectedCluster.name.toUpperCase(),
    [selectedCluster]
  );

  async function getBalance() {
    const portfolio = await getPortfolio();
    //console.log(portfolio);
    const tokenDetail = portfolio["tokens"].find(
      (x) => x.token_name === `${token.symbol}_${network_name}`
    );
    if (tokenDetail) {
      //console.log(tokenDetail);
      setBalance(tokenDetail.quantity);
      return;
    }
    setBalance(0);
  }

  useEffect(() => {
    getBalance();
  }, [token, network_name]);

  return (
    <Text className="text-[#707070] text-xs">
      Bal: {balance} {token.symbol}
    </Text>
  );
}

export default TokenBalance;
