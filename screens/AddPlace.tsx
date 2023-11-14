import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { StackScreenProps } from "../types/navigation";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";
interface IAddPlace extends StackScreenProps<"AddPlace"> {}

const AddPlace: React.FC<IAddPlace> = ({ navigation }) => {
  const handleCreatePlace = async (place: Place) => {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  };
  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlace;
