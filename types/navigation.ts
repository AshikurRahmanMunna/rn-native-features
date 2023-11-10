import { NativeStackScreenProps } from "@react-navigation/native-stack";
export type RootStackParamList = {
  AddPlace: undefined;
  AllPlaces: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
