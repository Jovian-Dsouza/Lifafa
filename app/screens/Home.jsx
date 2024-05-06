import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, View, Text, Button } from "react-native";
import { useState } from "react";
import { useOkto } from "okto-sdk-react-native";
import { Layout } from "../components/Layout";
import { CreateLifafaComponent } from "../components/CreateLifafaComponent";
import { EnvelopeHome } from "../components/EnvelopeHome";

function Home() {
  return (
    <Layout>
      <EnvelopeHome />
      <CreateLifafaComponent />
    </Layout>
  );
}

export default Home;
