import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading(props) {
  return (
    <View style={{ paddingHorizontal: 110, paddingVertical: 150 }}>
      <Text style={{ fontSize: 25 }}>Loading...</Text>
    </View>
  );
}
