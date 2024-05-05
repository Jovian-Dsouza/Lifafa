import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text, Button } from "react-native";
import { useState } from "react";
import { useOkto } from "okto-sdk-react-native";
import { Layout } from "../components/Layout";

function Home() {
  return (
    <Layout>
      <Text className="text-xl font-bold mb-3">Home</Text>
      <StatusBar style="auto" />
    </Layout>
  );
}

export default Home;
