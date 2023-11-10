import React from "react";
import {
  GestureResponderEvent,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
interface IPlaceItem {
  place: Place;
  onSelect?: (e: GestureResponderEvent) => void;
}
const PlaceItem: React.FC<IPlaceItem> = ({ place, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <Image
        source={{
          uri: place.imageUri,
        }}
      />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
