import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { StackScreenProps } from "../types/navigation";
import { fetchPlaceDetails } from "../util/database";
import { Place } from "../models/place";
interface IPlaceDetails extends StackScreenProps<"PlaceDetails"> {}
const PlaceDetails: React.FC<IPlaceDetails> = ({ route, navigation }) => {
  const handleShowOnMap = (lat: number, lng: number) => {
    navigation.navigate("Map", { lat, lng });
  };
  const [fetchedPlace, setFetchedPlace] = useState<Place | undefined>();
  const placeId = route.params.placeId;
  useEffect(() => {
    const loadPlace = async () => {
      const place = await fetchPlaceDetails(placeId);
      setFetchedPlace(place);
      navigation.setOptions({ title: place.title });
    };
    loadPlace();
  }, [placeId]);

  if (!fetchPlaceDetails) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton
          icon="map"
          onPress={() =>
            fetchedPlace?.location &&
            handleShowOnMap(
              fetchedPlace?.location.lat,
              fetchedPlace?.location.lng
            )
          }
        >
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
