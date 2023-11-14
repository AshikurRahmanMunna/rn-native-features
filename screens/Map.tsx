import React, { useState, useLayoutEffect, useCallback } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { StackScreenProps } from "../types/navigation";
import IconButton from "../components/UI/IconButton";
import { ILocation } from "../types/common";
interface IMap extends StackScreenProps<"Map"> {}
const Map: React.FC<IMap> = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.lat,
    lng: route.params.lng,
  };
  const [selectedLocation, setSelectedLocation] = useState<
    ILocation | undefined
  >(initialLocation);
  const initialRegion = {
    latitude: initialLocation?.lat || 37.78,
    longitude: initialLocation?.lng || -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const handleSelectLocation = (e: MapPressEvent) => {
    if (initialLocation) return;
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng });
  };
  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);
  useLayoutEffect(() => {
    if (initialLocation) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocation}
        />
      ),
    });
  }, [navigation, savePickedLocation, initialLocation]);
  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
