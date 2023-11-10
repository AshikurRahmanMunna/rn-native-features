import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList, StackScreenProps } from "./types/navigation";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }: StackScreenProps<"AllPlaces">) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen name="AddPlace" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
