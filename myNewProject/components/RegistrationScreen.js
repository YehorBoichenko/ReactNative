import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
  Button,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./assets/Fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./assets/Fonts/Roboto/Roboto-Medium.ttf"),
//   });
// };

// const initialState = {
//   email: "",
//   password: "",
// };

const bgImage = require("../assets/Photo-BG.jpg");

export default function RegistrationScreen() {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focusedUser, setFocusedUser] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const keyboardHide = () => {
  //   setIsShowKeyboard(false);
  //   Keyboard.dismiss();
  //   console.log(state);
  //   setstate(initialState);
  // };
  const handleName = (text) => setName(text);
  const handlePassword = (text) => setPassword(text);
  const handleEmail = (text) => setEmail(text);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          style={styles.bgImage}
          source={bgImage}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <View style={styles.registrationContainer}>
              {/* <View style={styles.inputContainer}>
                <Text style={styles.text}>Регистрация</Text>
              </View> */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Зарегестрироваться</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={handleName}
                placeholder="Логин"
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"default"}
                style={focusedUser ? styles.focusedInput : styles.input}
                onFocus={() => setFocusedUser(true)}
                onBlur={() => setFocusedUser(false)}
              />
              <TextInput
                value={email}
                onChangeText={handleEmail}
                placeholder="Адрес электронной почты"
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                style={focusedEmail ? styles.focusedInput : styles.input}
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(false)}
              />
              <TextInput
                value={password}
                onChangeText={handlePassword}
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                // icon={
                //   <TouchableOpacity
                //     onPress={() => {
                //       setIsSecureEntry((prev) => !prev);
                //     }}
                //   >
                //     <Text>{isSecureEntry ? "Показать" : "Спрятать"}</Text>
                //   </TouchableOpacity>
                // }
                // iconPosition="right"
                keyboardType={"default"}
                secureTextEntry={!showPassword}
                style={focusedPassword ? styles.focusedInput : styles.input}
                onFocus={() => setFocusedPassword(true)}
                onBlur={() => setFocusedPassword(false)}
              ></TextInput>
              {password && (
                <Text
                  style={styles.passwordBtn}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? "Спрятать" : "Показать"}
                </Text>
              )}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.registrationBtn}
              >
                <Text style={styles.registrationText}>Зарегестрироваться</Text>
              </TouchableOpacity>
              <View style={styles.containerForInput}>
                <Pressable style={styles.signInBtn}>
                  <Text style={styles.signInText}>Уже есть аккаунт? Войти</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  containerForInput: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  focusedInput: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bgImage: {
    flex: 1,
  },
  registrationContainer: {
    flex: 0.7,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  registrationBtn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: "center",
    borderRadius: 100,
    marginTop: 45,
  },
  passwordBtn: {
    position: "absolute",
    top: "35%",
    right: 35,
    fontSize: 16,
    lineHeight: 19,
  },
  registrationText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  header: {
    alignItems: "center",
    marginBottom: 33,
    marginTop: 32,
  },
  headerTitle: {
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  signInBtn: {
    marginTop: 16,
  },
  signInText: {
    color: "#1B4371",
  },
});
