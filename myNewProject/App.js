import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RegistrationScreen from "./components/RegistrationScreen";
import { AppLoading } from "expo";
import LoginScreen from "./components/LoginScreen";

// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
//   });
// };

export default function App() {
  // console.log(Platform.OS);
  // const [iasReady, setIasReady] = useState(false);
  // if (!iasReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadFonts}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  return (
    <>
      <LoginScreen />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
