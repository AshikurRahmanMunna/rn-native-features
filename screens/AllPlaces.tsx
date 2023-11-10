import React from "react";
import PlacesList from "../components/Places/PlacesList";
import { StackScreenProps } from "../types/navigation";
interface IAllPlaces extends StackScreenProps<"AllPlaces"> {}
const AllPlaces: React.FC<IAllPlaces> = ({}) => {
  return <PlacesList places={[]} />;
};

export default AllPlaces;
