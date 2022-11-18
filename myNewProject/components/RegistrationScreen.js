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
  Image,
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
const avatarPic = require("../assets/Rectangle 22.png");
const add = require("../assets/add.png");

export default function RegistrationScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focusedUser, setFocusedUser] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleName = (text) => setName(text);
  const handlePassword = (text) => setPassword(text);
  const handleEmail = (text) => setEmail(text);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const submitKeyboard = () => {
    setPassword("");
    setEmail("");
    setName("");
    keyboardHide();
    setShowPassword(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={{ ...styles.bgimage, marginBottom: isShowKeyboard ? -250 : 0 }}
        source={bgImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              style={{
                ...styles.registrationContainer,
                flex: isShowKeyboard ? 0.8 : 0.73,
                marginBottom: isShowKeyboard ? 250 : 0,
              }}
              onSubmitEditing={submitKeyboard}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <Image style={styles.avatarBtn} source={add} />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Регистрация</Text>
              </View>
              <TextInput
                value={name}
                onChangeText={handleName}
                placeholder="Логин"
                style={focusedUser ? styles.inputFocused : styles.input}
                onFocus={() => {
                  setFocusedUser(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusedUser(false);
                }}
              />
              <TextInput
                value={email}
                onChangeText={handleEmail}
                placeholder="Адрес электронной почты"
                placeholderTextColor={"#BDBDBD"}
                keyboardType={"email-address"}
                style={focusedEmail ? styles.inputFocused : styles.input}
                onFocus={() => {
                  setFocusedEmail(true);
                  setIsShowKeyboard(true);
                }}
                onBlur={() => {
                  setFocusedEmail(false);
                }}
              />
              <View style={styles.passwordInput}>
                <TextInput
                  value={password}
                  onChangeText={handlePassword}
                  placeholder="Пароль"
                  secureTextEntry={showPassword}
                  style={focusedPassword ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusedPassword(true);
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setFocusedPassword(false);
                  }}
                />
                {password && (
                  <Text
                    style={styles.passwordBtn}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? "Показать" : "Спрятать"}
                  </Text>
                )}
              </View>
              {!isShowKeyboard && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.registrationButton}
                >
                  <Text style={styles.registrationText}>
                    Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              )}
              <View style={styles.containerForInput}>
                {!isShowKeyboard && (
                  <Pressable style={styles.signInBtn}>
                    <Text style={styles.signInText}>
                      Уже есть аккаунт? Войти
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  inputContainer: {
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
  inputFocused: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bgimage: {
    flex: 1,
  },
  registrationContainer: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  registrationButton: {
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
  registrationText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    marginBottom: 33,
    marginTop: 30,
  },
  signInBtn: {
    marginTop: 16,
    marginBottom: 40,
  },
  signInText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
  },
  passwordBtn: {
    position: "absolute",
    top: "30%",
    right: 35,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwordInput: { position: "relative" },
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: { position: "absolute", bottom: 15, right: -12.5 },
});
