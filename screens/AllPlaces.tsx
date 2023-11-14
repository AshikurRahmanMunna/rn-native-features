import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { StackScreenProps } from "../types/navigation";
import { useIsFocused } from "@react-navigation/native";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";
interface IAllPlaces extends StackScreenProps<"AllPlaces"> {}
const AllPlaces: React.FC<IAllPlaces> = () => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const loadPlaces = async () => {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    };
    if (isFocused) {
      loadPlaces();
    }
  }, []);
  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
