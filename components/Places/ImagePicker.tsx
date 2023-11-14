import React, { useState } from "react";
import { View, Alert, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
interface IImagePicker {
  onTakeImage?: (image: string | undefined) => void;
}

const ImagePicker: React.FC<IImagePicker> = ({ onTakeImage }) => {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const [image, setImage] = useState<string | undefined>();

  const verifyPermissions = async () => {
    console.log(cameraPermissionInformation?.status);
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    return true;
  };
  const handleTakeImage = async () => {
    const granted = await verifyPermissions();
    if (!granted) return;
    const photo = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(photo.assets?.[0].uri);
    onTakeImage && onTakeImage(photo.assets?.[0].uri);
  };
  return (
    <View>
      <View style={styles.imagePreview}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text>No Image Taken</Text>
        )}
      </View>
      <OutlinedButton icon="camera" onPress={handleTakeImage}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
