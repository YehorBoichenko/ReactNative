import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import IconButton from "../../components/buttonIcons";
import db from "../../firebase/config";
import { useSelector } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [borderInput, setBorderInput] = useState(null);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();

  const { userId, nickName } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setBorderInput(null);
  };

  useEffect(() => {
    (async () => {
      cameraPermission.granted;
      if (!cameraPermission.granted) {
        await requestCameraPermission();
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPost();
    navigation.navigate("Home");
    setName("");
    setLocationName("");
  };
  const uploadPost = async () => {
    const photo = await uploadPhoto();

    const createPost = await db.firestore().collection("user-posts").add({
      photo,
      location,
      userId,
      nickName,
      locationName,
      name,
    });
    console.log("createPost", createPost);
  };

  const uploadPhoto = async () => {
    try {
      const response = await fetch(photo);
      const file = await response.blob();
      const postId = Date.now().toString();
      await db.storage().ref(`postImage/${postId}`).put(file);
      const processedPhoto = await db
        .storage()
        .ref("postImage")
        .child(postId)
        .getDownloadURL();
      return processedPhoto;
    } catch (error) {
      console.log("error.message", error.message);
      console.log("error.code", error.code);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 400 : 0 }}
      >
        <View style={styles.innerBox}>
          <View style={styles.innerBoxTextWrap}>
            <Text style={styles.innerBoxText}>Создать публикацию</Text>
          </View>
          <TouchableOpacity
            style={{ marginTop: 18, height: 35, width: 35 }}
            onPress={() => navigation.navigate("Home")}
          >
            <IconButton type="arrow-left" />
          </TouchableOpacity>
        </View>
        <View style={styles.postsContainer}>
          <Camera style={styles.camera} ref={setCamera}>
            <TouchableOpacity onPress={takePhoto} style={styles.snapContainer}>
              <IconButton type="camera" />
            </TouchableOpacity>
            {photo && (
              <TouchableOpacity
                style={styles.photoContainer}
                onPress={() => setPhoto(null)}
              >
                <Image source={{ uri: photo }} style={styles.imageContainer} />
              </TouchableOpacity>
            )}
          </Camera>
          <View onSubmitEditing={keyboardHide}>
            <Text style={styles.cameraText}>
              {!photo ? "Загрузите фото" : "Редактировать фото"}
            </Text>

            <TouchableOpacity style={{ marginTop: 38 }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    borderInput === "Название..." ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Название..."
                keyboardType="email-address"
                onFocus={() => {
                  setIsShowKeyboard(true);
                  setBorderInput("Название...");
                }}
                onChangeText={setName}
                value={name}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      borderInput === "Местность..." ? "#FF6C00" : "#E8E8E8",
                    paddingLeft: 28,
                  }}
                  placeholder="Местность..."
                  keyboardType="email - address"
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setBorderInput("Местность...");
                  }}
                  onChangeText={setLocationName}
                  value={locationName}
                />
                <View style={{ marginTop: 20, position: "absolute" }}>
                  <IconButton type="map" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.button,
                backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
              }}
              activeOpacity={0.7}
              onPress={sendPhoto}
            >
              <Text
                style={{
                  ...styles.titleButton,
                  color: photo ? "#ffffff" : "#BDBDBD",
                }}
              >
                Опубликовать
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  postsContainer: {
    marginHorizontal: 10,
  },
  camera: {
    height: "42%",
    marginTop: 32,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  snapContainer: {
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerBox: {
    flexDirection: "row-reverse",
    borderWidth: 1,
    padding: 11,
    paddingTop: 55,
    borderColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "space-around",
  },
  innerBoxText: {
    marginTop: 16,
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  innerBoxTextWrap: {
    flex: 2,
    alignItems: "center",
  },
  photoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    marginTop: 40,
    width: "100%",
    padding: 16,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  titleButton: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderRadius: 8,
    marginTop: 16,
    paddingLeft: 16,
    height: 40,
    width: "100%",
  },
  cameraText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 10,
  },
});

export default CreatePostsScreen;
