import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import PlaceItem from "./PlaceItem";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "../../types/navigation";
interface IPlacesList {
  places: Place[];
}
const PlacesList: React.FC<IPlacesList> = ({ places }) => {
  const navigation =
    useNavigation<StackScreenProps<"AllPlaces">["navigation"]>();
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={() => {
            navigation.navigate("PlaceDetails", { placeId: item.id });
          }}
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
