import React from "react";
import {
  View,
  Pressable,
  GestureResponderEvent,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IIconButton {
  onPress?: (e: GestureResponderEvent) => void;
  name: string;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IIconButton> = ({ onPress, name, size, color }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={name as any} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
