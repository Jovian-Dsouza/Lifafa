import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text, Button } from "react-native";
import { useState } from "react";
import { useOkto } from "okto-sdk-react-native";
import { Layout } from "../components/Layout";
import { CreateLifafaComponent } from "../components/CreateLifafaComponent";
import { EnvelopeHome } from "../components/EnvelopeHome";
import { ViewEnvelopesComponent } from "../components/ViewEnvelopesComponent";
import { useWallet } from "../providers/WalletProvider";

function Home({ navigation }) {
  const { isLoggedIn } = useWallet();

  useEffect(()=>{
    if(!isLoggedIn){
      navigation.navigate("Login")
    }
  }, [isLoggedIn])

  return (
    <Layout>
      <EnvelopeHome />
      <CreateLifafaComponent />
      <ViewEnvelopesComponent/>
    </Layout>
  );
}

export default Home;
