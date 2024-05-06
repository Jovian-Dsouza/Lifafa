import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { images } from "../assets/assets";

const Flap = ({ isOpen, flapRotation }) => (
  <Animated.View
    className={`absolute -top-[70px] left-0 w-full items-center h-full ${
      isOpen ? "" : "z-10 opacity-100"
    }`}
    style={{
      transform: [
        { translateY: 40 },
        { rotateX: flapRotation },
        { translateY: -40 },
      ],
    }}
  >
    <Image
      resizeMode="contain"
      source={images.envelope.top}
      className="w-[100%]"
    />
  </Animated.View>
);

const Letter = ({ children, letterPosition, letterOpacity }) => (
  <Animated.View
    className="absolute top-4 w-[95%]"
    style={{
      transform: [{ translateY: letterPosition }],
      opacity: letterOpacity,
    }}
  >
    <LinearGradient
      colors={["#601BD4", "#9866ED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.74, y: 1 }}
      className="h-36 rounded-xl bg-gray-500"
    >
      {children}
    </LinearGradient>
  </Animated.View>
);

export function Envelope({ children, isOpen, onPress }) {
  const flapRotationValue = useState(new Animated.Value(0))[0];
  const letterPositionValue = useState(new Animated.Value(0))[0];

  const animateOpen = () => {
    Animated.timing(flapRotationValue, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
    Animated.timing(letterPositionValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animateClose = () => {
    Animated.timing(letterPositionValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
    Animated.timing(flapRotationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const flapRotation = flapRotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"],
  });

  const letterPosition = letterPositionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [25, -15],
  });

  const letterOpacity = letterPositionValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (isOpen) {
      animateOpen();
    } else {
      animateClose();
    }
  }, [isOpen]);

  return (
    <View className="h-56 w-full justify-end">
      <TouchableOpacity activeOpacity={1} className="w-64" onPress={onPress}>
        <View className="absolute top-16 left-0 w-full h-16 bg-[#C5B0FF]"></View>
        <Flap isOpen={isOpen} flapRotation={flapRotation} />
        <View className="w-full items-center">
          <Letter letterPosition={letterPosition} letterOpacity={letterOpacity}>
            {children}
          </Letter>
        </View>
        <View className="abolute top-0 h-48">
          <Image
            resizeMode="contain"
            source={images.envelope.bottom}
            className="w-full justify-end items-end text-end pt-0 mt-0"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
