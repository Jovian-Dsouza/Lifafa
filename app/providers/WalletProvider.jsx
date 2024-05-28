import React, {
  useMemo,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useCluster } from "./ClusterProvider";
import { useOkto } from "okto-sdk-react-native";
import { PublicKey } from "@solana/web3.js";

export const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [wallet, setWallet] = useState();
  const { selectedCluster } = useCluster();
  const { getWallets, getPortfolio } = useOkto();
  const network = useMemo(
    () => `SOLANA_${selectedCluster.name.toUpperCase()}`,
    [selectedCluster]
  );
  const network_name = useMemo(
    () => selectedCluster.name.toUpperCase(),
    [selectedCluster]
  );

  async function getWalletForSelectedCluster() {
    try {
      const walletData = await getWallets();
      const solanaWallet = walletData.wallets.find(
        (x) => x.network_name == network
      );
      if (!solanaWallet) {
        console.log(
          `Error: Could not find ${network} in wallets: ${walletData.wallets}`
        );
        setWallet(null);
        return;
      }
      setWallet(solanaWallet);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("getWalletForSelectedCluster: ", error);
      setWallet(null);
      setIsLoggedIn(false);
    }
  }

  async function getBalance(token_symbol) {
    const portfolio = await getPortfolio();
    const tokenDetail = portfolio["tokens"].find(
      (x) => x.token_name === `${token_symbol}_${network_name}`
    );
    if (tokenDetail) {
      return tokenDetail.quantity;
    }
    return 0;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getWalletForSelectedCluster();
    }, 1000); // 1000 milliseconds = 1 second

    return () => clearTimeout(timeoutId); 
  }, [selectedCluster, isLoggedIn]);

  const walletPublicKey = useMemo(() => {
    if (!wallet) {
      return null;
    }
    return new PublicKey(wallet.address);
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        walletPublicKey,
        network,
        isLoggedIn,
        getWalletForSelectedCluster,
        getBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
