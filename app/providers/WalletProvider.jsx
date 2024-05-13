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
  const [wallet, setWallet] = useState();
  const { selectedCluster } = useCluster();
  const { getWallets } = useOkto();
  const network = useMemo(
    () => `SOLANA_${selectedCluster.name.toUpperCase()}`,
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
    } catch (error) {
      console.error(error);
      setWallet(null);
    }
  }

  useEffect(() => {
    getWalletForSelectedCluster();
  }, [selectedCluster]);

  const walletPublicKey = useMemo(() => {
    if (!wallet) {
      return null;
    }
    return new PublicKey(wallet.address);
  }, [wallet]);

  return (
    <WalletContext.Provider value={{ wallet, walletPublicKey, network }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
