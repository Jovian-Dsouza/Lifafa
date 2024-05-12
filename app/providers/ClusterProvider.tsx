import React from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface Cluster {
  name: string;
  endpoint: string;
  network: ClusterNetwork;
  active?: boolean;
}

export enum ClusterNetwork {
  Mainnet = "mainnet-beta",
  Testnet = "testnet",
  Devnet = "devnet",
  Custom = "custom",
}

export const defaultClusters: Readonly<Cluster[]> = [
  {
    name: "devnet",
    endpoint: clusterApiUrl("devnet"),
    network: ClusterNetwork.Devnet,
  },
  {
    name: "testnet",
    endpoint: clusterApiUrl("testnet"),
    network: ClusterNetwork.Testnet,
  },
  {
    name: "mainnet",
    endpoint: clusterApiUrl("mainnet-beta"),
    network: ClusterNetwork.Mainnet,
  },
];

export interface ClusterProviderContext {
  selectedCluster: Cluster;
  clusters: Cluster[];
  setSelectedCluster: (cluster: Cluster) => void;
  getExplorerUrl(path: string): string;
}

const ClusterContext = createContext<ClusterProviderContext>(
  {} as ClusterProviderContext
);

export function ClusterProvider({
  children,
  defaultClusterName = "devnet",
}: {
  children: ReactNode;
  defaultClusterName: string;
}) {
  const clusters = [...defaultClusters];
  const [selectedCluster, setSelectedCluster] = useState<Cluster>(
    getClusterByName(defaultClusterName)
  );

  function getClusterByName(name: string) {
    const cluster = clusters.find((x) => x.name == name);
    if (!cluster) {
      return defaultClusters[0];
    }
    return cluster;
  }

  const value: ClusterProviderContext = useMemo(
    () => ({
      selectedCluster,
      clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
      setSelectedCluster: (cluster: Cluster) => setSelectedCluster(cluster),
      getExplorerUrl: (path: string) =>
        `https://explorer.solana.com/${path}${getClusterUrlParam(
          selectedCluster
        )}`,
    }),
    [selectedCluster, setSelectedCluster]
  );
  return <ClusterContext.Provider value={value}>{children}</ClusterContext.Provider>;
}

export function useCluster() {
  return useContext(ClusterContext);
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = "";
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = "devnet";
      break;
    case ClusterNetwork.Mainnet:
      suffix = "";
      break;
    case ClusterNetwork.Testnet:
      suffix = "testnet";
      break;
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
      break;
  }

  return suffix.length ? `?cluster=${suffix}` : "";
}

