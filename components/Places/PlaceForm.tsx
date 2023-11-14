import React, { useState, useCallback } from "react";
import { View, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { ILocation } from "../../types/common";
import { Place } from "../../models/place";
interface IPlaceForm {
  onCreatePlace: (place: Place) => void;
}
const PlaceForm: React.FC<IPlaceForm> = ({ onCreatePlace }) => {
  const [title, setTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState<ILocation | undefined>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const handleChangePickedLocation = useCallback(
    (location: ILocation | undefined) => {
      setPickedLocation(location);
    },
    []
  );

  const handleChangeSelectedImage = useCallback((image: string | undefined) => {
    setSelectedImage(image);
  }, []);

  const handleSavePress = () => {
    if (!title || !selectedImage || !pickedLocation) return;
    const placeData = new Place(title, selectedImage, pickedLocation);
    onCreatePlace && onCreatePlace(placeData);
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          placeholder="Enter title"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <ImagePicker onTakeImage={handleChangeSelectedImage} />
      <LocationPicker onPickLocation={handleChangePickedLocation} />
      <Button onPress={handleSavePress}>Add Place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
