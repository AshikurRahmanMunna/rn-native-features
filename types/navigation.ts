import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type RootStackParamList = {
  AddPlace:
    | {
        pickedLat: number;
        pickedLng: number;
      }
    | undefined;
  AllPlaces: undefined;
  Map:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  PlaceDetails: {
    placeId: string;
  };
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
