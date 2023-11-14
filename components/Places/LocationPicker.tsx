import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Image } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAddress, getMapPreview } from "../../util/location";
import { StackScreenProps } from "../../types/navigation";
import { ILocation } from "../../types/common";
interface ILocationPicker {
  onPickLocation?: (location: ILocation | undefined) => void;
}
const LocationPicker: React.FC<ILocationPicker> = ({ onPickLocation }) => {
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation =
    useNavigation<StackScreenProps<"AddPlace">["navigation"]>();
  const route = useRoute<StackScreenProps<"AddPlace">["route"]>();
  const isFocused = useIsFocused();

  const [location, setLocation] = useState<ILocation | undefined>(undefined);

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setLocation(mapPickedLocation);
    }
  }, [isFocused, route]);

  useEffect(() => {
    const handleLocation = async () => {
      if (location) {
        const address = await getAddress(location.lat, location.lng);
        onPickLocation && onPickLocation({ ...location, address });
      }
    };
    handleLocation();
  }, [location, onPickLocation]);

  const verifyPermissions = async () => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }
    return true;
  };

  const getUserLocation = async () => {
    const permissionGranted = await verifyPermissions();
    if (!permissionGranted) return;
    const location = await getCurrentPositionAsync({});
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const pickUserLocationOnMap = () => {
    navigation.navigate("Map");
  };
  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          <Image
            style={styles.image}
            source={{ uri: getMapPreview(location.lat, location.lng) }}
          />
        ) : null}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getUserLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickUserLocationOnMap}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
